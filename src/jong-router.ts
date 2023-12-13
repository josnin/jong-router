// web-components-router.ts

class JongRouter {

  private componentsPath: string;

  private routes: { pattern: string; component: string }[];



  constructor(componentsPath: string, routes: { pattern: string; component: string }[]) {

    this.componentsPath = componentsPath;

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

      this.loadComponent('notfound-component');

    }

  }



  private loadComponent(componentName: string): void {

    import(`${this.componentsPath}${componentName}`)

      .then(module => {

        const component = document.createElement(componentName);

        console.log(JSON.stringify(this.getRouteParams()));
        component.setAttribute('route-params', JSON.stringify(this.getRouteParams()));

        document.getElementById('app')!.innerHTML = '';

        document.getElementById('app')!.appendChild(component);

      })

      .catch(error => console.error(`Error loading component: ${error}`));

  }



  private handleLinkClick(event: Event): void {

    if (event.target instanceof HTMLAnchorElement && event.target.getAttribute('href')) {

      event.preventDefault();

      const href = event.target.getAttribute('href');

      window.history.pushState({}, '', href);

      this.navigate();

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