/**
 * Context passed to Route Guards to decide if a user can access a route.
 */
export interface GuardContext {
  path?: string
  params?: Record<string, string>
  query?: URLSearchParams
  data?: any
}

/**
 * Definition of a single Route.
 */
export interface IRoute {
  pattern: string // URL pattern (e.g., '/user/:id')
  component?: Promise<any> // Lazy-loaded component class
  html?: string // Simple HTML string fallback
  children?: IRoute[] | (() => Promise<{ default: IRoute[] }>) // Nested routes
  guards?: ((ctx?: any) => boolean)[] // Array of protection functions
  redirect?: string // Path to go to if guards fail
  data?: Record<string, any> // Custom metadata
}

class JongRouter {
  private routes: IRoute[]
  private outlet: HTMLElement // The main container where components are injected

  constructor(routes: IRoute[], outlet: HTMLElement) {
    this.routes = routes
    this.outlet = outlet
  }

  /**
   * Starts the router by listening to browser events and initial navigation.
   */
  public init(): void {
    // Listen for back/forward browser button clicks
    window.addEventListener('popstate', () => this.navigate())

    // Intercept global clicks for elements with [router-link]
    document.addEventListener('click', (event) => this.handleClick(event))

    // Run navigation for the current URL on load
    this.navigate()
  }

  /**
   * Intercepts clicks to handle internal navigation without refreshing the page.
   */
  private handleClick(event: Event): void {
    const path = event.composedPath()

    // Find if the clicked element (or its parents) is a router-link
    const link = path.find(node =>
      ((node instanceof HTMLAnchorElement) || (node instanceof HTMLButtonElement)) &&
      node.hasAttribute('router-link')
    ) as (HTMLAnchorElement | HTMLButtonElement) | undefined

    if (!link) return

    const href = link.getAttribute('href')
    if (!href || href.startsWith('http')) return // Ignore external links

    // Allow standard browser behavior for special clicks (Cmd+Click, etc.)
    if (event instanceof MouseEvent) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    }

    event.preventDefault()
    this.navigateTo(href)
  }

  /**
   * Matches the current browser URL against the route table and triggers rendering.
   */
  private navigate(): void {
    const path = window.location.pathname

    // Find the most specific match (longest pattern first)
    const matched = this.routes
      .sort((a,b) => b.pattern.length - a.pattern.length)
      .find(route => this.matchRoute(route.pattern, path))

    if (!matched) return

    // Convert URL segments into key-value params (e.g., :id -> 123)
    const params = this.extractRouteParams(matched.pattern, path)

    this.renderRoute(matched, params)
  }

  /**
   * Handles Guards, Component instantiation, and Nested routes.
   */
  private async renderRoute(
    route: IRoute,
    params: Record<string,string>,
    outlet: HTMLElement = this.outlet
  ) {
    // 1. Check Guards: If any guard returns false, redirect or stop
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

    let componentInstance: any = null

    // 2. Render Strategy: Component Class vs Plain HTML
    if (route.component) {
      const module = await route.component
      const Component = module.default

      componentInstance = new Component()
      
      // Pass params to the component via attribute
      componentInstance.setAttribute('route-params', JSON.stringify(params))
      // Inject router instance so component can call this.router.navigateTo()
      componentInstance.router = this

      outlet.innerHTML = ''
      outlet.appendChild(componentInstance)
    } 
    else if (route.html) {
      outlet.innerHTML = route.html
    }

    // 3. Nested Route Handling
    if (route.children) {
      let children: IRoute[]

      // Resolve children if they are lazy-loaded via function
      if (typeof route.children === "function") {
        const module = await (route.children as () => Promise<any>)()
        children = module.default
      } else {
        children = route.children as IRoute[]
      }

      // Look for a sub-outlet inside the component (Shadow DOM or Light DOM)
      const childOutlet =
        componentInstance?.shadowRoot?.querySelector('[router-outlet]') ||
        componentInstance?.querySelector('[router-outlet]') ||
        outlet

      const path = window.location.pathname

      // Find which child route matches the current path
      const childMatch = children
        .sort((a,b) => b.pattern.length - a.pattern.length)
        .find(child => this.matchRoute(child.pattern, path))

      if (childMatch) {
        const childParams = this.extractRouteParams(childMatch.pattern, path)
        // Recursively render the child into the found sub-outlet
        await this.renderRoute(
          childMatch,
          childParams,
          childOutlet as HTMLElement
        )
      }
    }
  }

  /**
   * Basic string matching. Supports ':param' wildcards and '**' catch-all.
   */
  private matchRoute(pattern: string, path: string): boolean {
    if (pattern === '**') return true

    const p = pattern.split('/').filter(Boolean)
    const s = path.split('/').filter(Boolean)

    if (p.length > s.length) return false

    return p.every((seg, i) => seg.startsWith(':') || seg === s[i])
  }

  /**
   * Maps URL values to parameter names based on the pattern.
   */
  private extractRouteParams(pattern: string, path: string) {
    const params: Record<string,string> = {}
    const p = pattern.split('/').filter(Boolean)
    const s = path.split('/').filter(Boolean)

    p.forEach((seg, i) => {
      if (seg.startsWith(':')) {
        params[seg.slice(1)] = s[i]
      }
    })
    return params
  }

  /**
   * Programmatic navigation (e.g., router.navigateTo('/dashboard'))
   */
  public navigateTo(route: string) {
    window.history.pushState({}, '', route) // Change URL without refresh
    this.navigate() // Trigger the matching logic
  }
}

export default JongRouter
