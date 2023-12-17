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
  private outlet: HTMLElement;
  private shadowRoot1: ShadowRoot | undefined;



  constructor(routes: IRoute[], outlet: HTMLElement, shadowRoot1?: ShadowRoot | undefined) {

    this.routes = routes;
    this.outlet = outlet;
    this.shadowRoot1 = shadowRoot1;

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
        this.loadComponent(matchedRoute.component, this.extractRouteParams(matchedRoute.pattern, path), matchedRoute.data);
      } else if (matchedRoute.html) {
        this.loadContent(matchedRoute.html)
      } else {
        console.warn('no component or html route specified!')
      }

      return;

    }

    // to handle users navigating to a path not defined in the routes
    // example page not found
    const notMatchedRoute: IRoute | undefined = this.routes.find(route => route.pattern === '**');
    if (notMatchedRoute) {
      if (notMatchedRoute.component) {
        this.loadComponent(notMatchedRoute.component, this.extractRouteParams(notMatchedRoute.pattern, path), notMatchedRoute.data);
      } else if (notMatchedRoute.html) {
        this.loadContent(notMatchedRoute.html)
      }
    }

  }


  private loadContent(html: string): void {
    //const app = document.getElementById(this.app);
    //if (app) app.innerHTML = html;
    this.outlet.innerHTML = html;
  }

  private async loadComponent(componentImport: Promise<any>, params: { [key: string]: string }, data: { [key: string]: string }): Promise<void> {

    componentImport

      .then(module => {

        const ComponentClass = module.default;

        const component = new ComponentClass();

        if (params) component.setAttribute('route-params', JSON.stringify(params));
        if (data) component.setAttribute('route-data', JSON.stringify(data));
        component.router = this;

        //document.getElementById(this.app)!.innerHTML = '';
        this.outlet.innerHTML = '';

        //document.getElementById(this.app)!.appendChild(component);
        this.outlet.appendChild(component);


      })

      .catch(error => { 
        console.error(`Error loading component: ${error}`);
        //document.getElementById(this.app)!.innerHTML = 'Component not found'
        this.outlet.innerHTML = 'Component not found'

      });

  }



  private handleClick(event: Event): void {

    // @ts-ignore
    const isInsideShadowDom = event.composedPath().includes(this.shadowRoot1)
    const target = isInsideShadowDom ? event.composedPath()[0] : event.target;


    if (

      (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) &&

      target.hasAttribute('router-link')

    ) {

      event.preventDefault();

      //const href = event.target.getAttribute('href');
      const href = target.getAttribute('href');

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