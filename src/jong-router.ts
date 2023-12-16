// jong-router.ts

interface IRoute {

  // url path to match
  pattern: string;

  // use component based to defin the app content
  component?: Promise<any>;

  // use html element to define the app content
  html?: string;

  guards?: (() => boolean)[];

  // mostly use for guard side effects
  redirect?: string;

  // additional data to pass to components
  data?: any; 
}


class JongRouter {

  private routes: IRoute[];
  private app: string;



  constructor(routes: IRoute[], app: string) {

    this.routes = routes;
    this.app = app;

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

    const app = document.getElementById(this.app);



    if (matchedRoute) {

      if (matchedRoute.guards) {
        const guardsRes = matchedRoute.guards.every(guard => {
          const guardFn = guard.bind(this)();
          if (!guardFn) {
            if (matchedRoute.redirect) {
              this.navigateTo(matchedRoute.redirect);
            } else {
              console.warn('Guard prevented navigation, and no redirect route specified!');
            }
          }
          return guardFn === true;
        });

        // dont proceed if
        // aggregate result is false
        if (guardsRes === false) return;

      }

      if (matchedRoute.component) {
        this.loadComponent(matchedRoute.component, this.extractRouteParams(matchedRoute.pattern, path));
      } else if (matchedRoute.html) {
        this.loadContent(matchedRoute.html)
      } else {
        // TODO?
        //const notFoundRoute: IRoute | undefined = this.routes.find(route => route.pattern === '**');
        //if (notFoundRoute) {
        //  this.loadComponent(notFoundRoute.component, {})
        //}
        console.warn('No matching route found!')
      }

    }

  }


  private loadContent(html: string): void {
    const app = document.getElementById(this.app);
    if (app) app.innerHTML = html;
  }

  private async loadComponent(componentImport: Promise<any>, params: { [key: string]: string }): Promise<void> {

    componentImport

      .then(module => {

        const ComponentClass = module.default;

        const component = new ComponentClass();

        component.setAttribute('route-params', JSON.stringify(params));
        component.router = this;

        document.getElementById(this.app)!.innerHTML = '';

        document.getElementById(this.app)!.appendChild(component);


      })

      .catch(error => { 
        console.error(`Error loading component: ${error}`);
        document.getElementById(this.app)!.innerHTML = 'Component not found'

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