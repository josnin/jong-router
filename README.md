# JongRouter



A lightweight and simple-to-use web components router in Vanilla JavaScript with support for guards, nested routes, page not found, passing query parameters to components, passing route parameters to components, passing route data to components, and a router link for single-page application navigation without reloading the page.



## Features



- **Routing**: Define routes and associate them with components.

- **Guards**: Implement route guards to control navigation based on conditions. ([Example](https://github.com/josnin/jong-router/tree/main/samples/guards))

- **Nested Routes**: Create hierarchical routes for nested components. ([Example](https://github.com/josnin/jong-router/tree/main/samples/nestedroutes))

- **Page Not Found**: Handle routes that do not match any defined route. ([Example](https://github.com/josnin/jong-router/tree/main/samples/page-not-found))

- **Query Parameters**: Pass query parameters to components. ([Example](https://github.com/josnin/jong-router/tree/main/samples/query-params))

- **Route Parameters**: Extract and pass route parameters to components. ([Example](https://github.com/josnin/jong-router/tree/main/samples/route-params))

- **Route Data**: Include additional data associated with each route. ([Example](https://github.com/josnin/jong-router/tree/main/samples/route-data))

- **Router Link**: Use attribute `router-link` to navigate without reloading the page. ([Example](https://github.com/josnin/jong-router/tree/main/samples/router-link))



## Installation



Include the `jong-router.js` script in your HTML file.

### Plug & Play, Import directly from cdn

```html
<!-- via html -->
<script type="module" src="https://cdn.jsdelivr.net/npm/jong-router@latest/dist/jong-router.min.js"></script>

```

```js
// via js
// latest 
import JongRouter from 'https://cdn.jsdelivr.net/npm/jong-router@latest/dist/jong-router.min.js'

// or specific version
import JongRouter from 'https://cdn.jsdelivr.net/npm/jong-router@0.1.13/dist/jong-router.min.js'

```

### Or Install using NPM

```js
// or via npm
npm i jong-router   
```



## Usage



1. **Initialize the Router:**



```javascript

const router = new JongRouter([

  { pattern: '/', component: import('./components/HomeComponent') },

  { pattern: '/about', component: import('./components/AboutComponent') },

  // Add more routes as needed

], document.getElementById('app') );



router.init();

```



2. **Create Components:**



Create your web components for each route.



```javascript

// Example: HomeComponent.js

class HomeComponent extends HTMLElement {

  connectedCallback() {

    this.innerHTML = '<h1>Home Component</h1>';

  }

}



customElements.define('home-component', HomeComponent);

```



3. **Navigate with Router Links:**



Use the `router-link` attribute to create navigation links.



```html

<!-- Example: index.html -->

<a router-link href="/">Home</a>

<a router-link href="/about">About</a>

```



4. **Guards**



Implement guards for route conditions 



```javascript

const router = new JongRouter([

  {

    pattern: '/dashboard',

    component: import('./components/DashboardComponent'),

    guards: [() => isAuthenticated()],

    redirect: '/login',  

  },

  { pattern: '/login', component: import('./components/LoginComponent') }, 
  // ...other routes

]);



function isAuthenticated() {

  // Your authentication logic here

  return true;

}

```



5. **Handle Route Parameters and Query Parameters:**



Access route parameters and query parameters in your components.



```javascript

// Example: UserComponent.js

class UserComponent extends HTMLElement {

  connectedCallback() {

    const routeParams = JSON.parse(this.getAttribute('route-params'));

    const queryParams = JSON.parse(this.getAttribute('query-params'));



    this.innerHTML = `<h1>User Details</h1>

                      <p>User ID: ${routeParams.id}</p>

                      <p>Query Param: ${queryParams.example}</p>`;

  }

}



customElements.define('user-component', UserComponent);

```

## How to run development server? 
```
git clone git@github.com:josnin/jong-router.git 
cd ~/Documents/jong-router/
npm install
npm run dev
```

## Help

Need help? Open an issue in: [ISSUES](https://github.com/josnin/jong-router/issues)


## Contributing
Want to improve and add feature? Fork the repo, add your changes and send a pull request.

