// jong-router.ts

interface IRoute {
  pattern: string;
  component?: Promise<any>;
  html?: string;
  guard?: () => boolean;
  redirectTo?: string;
}


class JongRouter {

  private routes: { pattern: string; component: Promise<any> }[];



  constructor(routes: { pattern: string; component: Promise<any> }[]) {

    this.routes = routes;

  }



  public init(): void {

    this.setupNavigation();

    this.navigate();

  }



  private setupNavigation(): void {

    window.addEventListener('popstate', () => this.navigate());

    document.addEventListener('click', (event) => this.handleClick(event));

  }



  private navigate(): void {

    const path = window.location.pathname;

    const matchedRoute: IRoute | undefined  = this.routes.find(route => this.matchRoute(route.pattern, path));

    //console.log(`matchedRoute? > ${matchedRoute}`)
    //console.log(`matchedRoute.component > ${matchedRoute?.component}`)

    const app = document.getElementById('app');



    if (matchedRoute) {

      if (matchedRoute.guard && !matchedRoute.guard.call(this)) {
        if (matchedRoute.redirectTo) {
          this.navigateTo(matchedRoute.redirectTo);
        } else {
          console.warn('Guard prevented navigation, and no redirect route specified!');
        }
        return;
      }

      if (matchedRoute.component) {
        this.loadComponent(matchedRoute.component, this.extractRouteParams(matchedRoute.pattern, path));
      } else if (matchedRoute.html) {
        this.loadContent(matchedRoute.html)
      } else {
        console.warn('No matching route found!')
      }

    }

  }


  private loadContent(html: string): void {
    const app = document.getElementById('app');
    if (app) app.innerHTML = html;
  }

  private async loadComponent(componentImport: Promise<any>, params: { [key: string]: string }): Promise<void> {

    componentImport

      .then(module => {

        const ComponentClass = module.default;

        const component = new ComponentClass();

        component.setAttribute('route-params', JSON.stringify(params));
        component.router = this;

        document.getElementById('app')!.innerHTML = '';

        document.getElementById('app')!.appendChild(component);


      })

      .catch(error => { 
        console.error(`Error loading component: ${error}`);
        document.getElementById('app')!.innerHTML = 'Component not found'

      });

  }



  private handleClick(event: Event): void {

    if (

      (event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement) &&

      event.target.hasAttribute('router-link')

    ) {

      event.preventDefault();

      const href = event.target.getAttribute('href');

      window.history.pushState({}, '', href);

      this.navigate();

    }

  }



  private matchRoute(pattern: string, path: string): boolean {

    const patternSegments = pattern.split('/').filter(segment => segment !== '');

    const pathSegments = path.split('/').filter(segment => segment !== '');


    return patternSegments.length === pathSegments.length &&

      patternSegments.every((patternSegment, i) =>

        patternSegment.startsWith(':') || patternSegment === pathSegments[i]

      );

  }



  private extractRouteParams(pattern: string, path: string): { [key: string]: string } {

    return pattern.split('/').reduce((params, segment, i) => {

      if (segment.startsWith(':')) {

        // @ts-ignore
        params[segment.slice(1)] = path.split('/')[i];

      }

      return params;

    }, {});

  }



  public navigateTo(route: string): void {

    window.history.pushState({}, '', route);

    this.navigate();

  }

}



// Export the class for reuse
export { IRoute }

export default JongRouter;