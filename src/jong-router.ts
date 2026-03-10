// jong-router.ts


export interface GuardContext {
  path?: string
  params?: Record<string, string>
  query?: URLSearchParams
  data?: any
}

//export type Guard = (this: JongRouter, ctx?: GuardContext) => boolean




export interface IRoute {
  pattern: string
  component?: Promise<any>
  html?: string
  children?: IRoute[]
  guards?: ((ctx?: any) => boolean)[]
  redirect?: string
  data?: Record<string, any>
}

class JongRouter {

  private routes: IRoute[]
  private outlet: HTMLElement
  private basePath: string
  private isRoot: boolean

  constructor(
    routes: IRoute[],
    outlet: HTMLElement,
    basePath: string = '',
    isRoot: boolean = false
  ) {
    this.routes = routes
    this.outlet = outlet
    this.basePath = basePath
    this.isRoot = isRoot
  }

  public init(): void {

    if (this.isRoot) {

      window.addEventListener('popstate', () => this.navigate())

      document.addEventListener('click', (event) => this.handleClick(event))

    }

    this.navigate()

  }

  private handleClick(event: Event): void {

    const path = event.composedPath()

    // Find the first element that is <a> or <button> with router-link
    const link = path.find(node =>
      ((node instanceof HTMLAnchorElement) || (node instanceof HTMLButtonElement)) &&
      node.hasAttribute('router-link')
    ) as (HTMLAnchorElement | HTMLButtonElement) | undefined

    if (!link) return

    const href = link.getAttribute('href')
    if (!href || href.startsWith('http')) return

    if (event instanceof MouseEvent) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    }

    event.preventDefault()

    // Both <a> and <button> now navigate via router
    this.navigateTo(href)
  }


  private navigate(): void {

    const path = window.location.pathname

    const matched = this.routes.find(route =>
      this.matchRoute(route.pattern, path)
    )

    if (!matched) return

    const params = this.extractRouteParams(matched.pattern, path)

    this.renderRoute(matched, params)

  }

  private async renderRoute(
    route: IRoute,
    params: Record<string, string>
  ) {

    if (route.guards) {

      const ctx = {
        path: window.location.pathname,
        params,
        query: new URLSearchParams(window.location.search),
        data: route.data
      }

      const ok = route.guards.every(g => g(ctx))

      if (!ok) {
        if (route.redirect) this.navigateTo(route.redirect)
        return
      }

    }


    if (route.component) {

      const module = await route.component
      const Component = module.default

      const component = new Component()

      component.setAttribute('route-params', JSON.stringify(params))
      component.router = this

      this.outlet.innerHTML = ''
      this.outlet.appendChild(component)

      if (route.children) {

        const childOutlet =
          component.shadowRoot?.querySelector('[router-outlet]') ||
          component.querySelector('[router-outlet]')

        if (childOutlet) {

          const childRouter = new JongRouter(
            route.children,
            childOutlet as HTMLElement,
            route.pattern
          )

          childRouter.navigate()

        }

      }

    }

    else if (route.html) {

      this.outlet.innerHTML = route.html

    }

  }

  private matchRoute(pattern: string, path: string): boolean {

    if (pattern === '**') return true

    const p = pattern.split('/').filter(Boolean)
    const s = path.split('/').filter(Boolean)

    if (p.length > s.length) return false

    return p.every((seg, i) =>
      seg.startsWith(':') || seg === s[i]
    )

  }

  private extractRouteParams(pattern: string, path: string) {

    const params: Record<string,string> = {}

    const p = pattern.split('/').filter(Boolean)
    const s = path.split('/').filter(Boolean)

    p.forEach((seg,i) => {
      if (seg.startsWith(':')) {
        params[seg.slice(1)] = s[i]
      }
    })

    return params
  }

  public navigateTo(route: string) {

    window.history.pushState({}, '', route)

    this.navigate()

  }

}

export default JongRouter;