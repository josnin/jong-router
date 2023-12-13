// jong-router.ts

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

    document.addEventListener('click', (event) => this.handleLinkClick(event));

  }



  private navigate(): void {

    const path = window.location.pathname;

    const app = document.getElementById('app');



    const matchedRoute = this.routes.find(route => new RegExp(`^${route.pattern}(\/[^\/]+)?$`).test(path));



    if (matchedRoute) {

      this.loadComponent(matchedRoute.component);

    } else {

      this.loadComponent(Promise.reject('Component not found')); // Reject if no route matches

    }

  }



  private loadComponent(componentImport: Promise<any>): void {

    componentImport

      .then(module => {

        console.log(module.default)
        const ComponentClass = module.default;
        const component = new ComponentClass;
        //const component = document.createElement(module.default.name);

        component.setAttribute('route-params', JSON.stringify(this.getRouteParams()));

        document.getElementById('app')!.innerHTML = '';

        document.getElementById('app')!.appendChild(component);

      })

      .catch(error => console.error(`Error loading component: ${error}`));

  }



  private handleLinkClick(event: Event): void {

    if (event.target instanceof HTMLAnchorElement && event.target.getAttribute('href')) {


      const disableRouter = event.target.hasAttribute('data-disable-router')

      if (!disableRouter) {
        event.preventDefault();
        const href = event.target.getAttribute('href');

        window.history.pushState({}, '', href);
        this.navigate();

      }


    }

  }



  private getRouteParams(): string[] {

    const path = window.location.pathname;

    const segments = path.split('/').filter(segment => segment !== '');

    return segments.slice(2); // Exclude the root and component name segments

  }



  public navigateTo(route: string): void {

    window.history.pushState({}, '', route);

    this.navigate();

  }

}



// Export the class for reuse

export default JongRouter;
