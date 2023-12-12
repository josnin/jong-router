 class LazyComponent extends HTMLElement {

      connectedCallback() {

        const componentName = this.getAttribute('component');

        import(`./components/${componentName}.js`)

          .then(module => {

            const component = document.createElement(componentName);

            component.setAttribute('route-params', JSON.stringify(getRouteParams()));

            this.appendChild(component);

          })

          .catch(error => console.error(`Error loading component: ${error}`));

      }

    }


 customElements.define('lazy-component', LazyComponent);



    function navigate() {

      const path = window.location.pathname;

      const app = document.getElementById('app');



      switch (true) {

        case path === '/':

          loadComponent('home-component');

          break;

        case /^\/about(\/[^\/]+)?$/.test(path):

          loadComponent('about-component');

          break;

        case /^\/about\/team(\/[^\/]+)?$/.test(path):

          loadLazyComponent('team-component');

          break;

        case /^\/profile(\/[^\/]+)?$/.test(path):

          loadLazyComponent('profile-component');

          break;

        default:

          loadComponent('not-found-component');

      }

    }



    function loadComponent(componentName) {

      import(`./components/${componentName}.js`)

        .then(module => {

          const component = document.createElement(componentName);

          component.setAttribute('route-params', JSON.stringify(getRouteParams()));

          app.innerHTML = '';

          app.appendChild(component);

        })

        .catch(error => console.error(`Error loading component: ${error}`));

    }



    function loadLazyComponent(componentName) {

      const lazyComponent = document.createElement('lazy-component');

      lazyComponent.setAttribute('component', componentName);

      app.innerHTML = '';

      app.appendChild(lazyComponent);

    }



    function getRouteParams() {

      const path = window.location.pathname;

      const segments = path.split('/').filter(segment => segment !== '');

      return segments.slice(2); // Exclude the root and component name segments

    }



    // Initial navigation and handle popstate events

    window.addEventListener('popstate', navigate);

    navigate();



    // Handle clicks on links to update the URL and trigger navigation

    document.addEventListener('click', (event) => {

      if (event.target.tagName === 'A' && event.target.getAttribute('href')) {

        event.preventDefault();

        const href = event.target.getAttribute('href');

        window.history.pushState({}, '', href);

        navigate();

      }

    });



    // Inline event handler for the button click to navigate to the "/about" route

    function navigateToAbout() {

      window.history.pushState({}, '', '/about');

      navigate();

    }
