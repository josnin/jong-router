[![NPM](https://nodei.co/npm/jong-router.svg?style=flat&data=v,d&color=red)](https://nodei.co/npm/jong-router/)

# JongRouter



JongRouter is a lightweight client-side router for Web Components, built with Vanilla JavaScript.
It enables Single Page Application (SPA) navigation without page reloads while staying framework-agnostic.
Designed for developers who want a simple router for Web Components without bringing in a heavy framework.


## Features

* SPA Navigation
Navigate without reloading the page using the router-link attribute.
* Route Guards
Protect routes with custom guard logic before navigation.
* Nested Routing
Easily compose child routers inside Web Components.
* Shadow DOM Support
Works seamlessly with Web Components using Shadow DOM.
* Route Parameters
Dynamic routes like `/profile/:username`.
* Query Parameters
Access query strings like `/profile/jong?tab=settings`.
* Route Data
Pass static metadata to components.
* Programmatic Navigation
Navigate using `router.navigateTo()`.
* 404 Page Handling
Built-in fallback route using **.
* Buttons & Links Support
Works with both <a> and <button> elements.



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

const routes = [

  { pattern: '/', component: import('./components/HomeComponent') },

  { pattern: '/about', component: import('./components/AboutComponent') },

  { pattern: '**', html: `<h2>Page not found</h2>` }

]

const router = new JongRouter(
  routes,
  document.getElementById('app')
)

router.init()


```



2. **Create Components:**



Create your web components for each route.



```javascript

class HomeComponent extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `<h1>Home Page</h1>`

  }

}

customElements.define('home-component', HomeComponent)


```



3. **Navigate with Router Links:**



Use the `router-link` attribute to create navigation links.



```html

<!-- Example: index.html -->

<a router-link href="/">Home</a>

<a router-link href="/about">About</a>

```

Buttons also work with router-link
```html
<button router-link href="/about">
Go to About
</button>
```

4. Programmatic Navigation
Components can navigate programmatically.

```js
import { router } from "../router-instance"

router.navigateTo("/profile/admin")
```

Example inside a component
```js
this.shadowRoot
  .getElementById("btn")
  .addEventListener("click", () => {

    router.navigateTo("/profile/admin")

  })
```


5. **Guards**



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



function isAuthenticated(ctx) {

  // Your authentication logic here
  console.log(ctx.path)
  console.log(ctx.params)

  return true;

}

```



6. **Handle Route Parameters and Query Parameters:**


Define dynamic routes Parameter:
```js
{
  pattern: "/profile/:username",
  component: import("./ProfileComponent")
}
```

Access inside the component
```js
const params = JSON.parse(
  this.getAttribute("route-params")
)

console.log(params.username)
```


Define query parameter
```js
/profile/jong?tab=settings
```

Inside component
```js
const query = JSON.parse(
  this.getAttribute("query-params")
)

console.log(query.tab)
```

7. **Route Data**
Attach metadata to routes

```js
{
  pattern: "/profile/:username",
  component: import("./ProfileComponent"),
  data: { role: "admin" }
}
```
Access in component
```js
const data = JSON.parse(
  this.getAttribute("route-data")
)
```


8. **Nested Routes**
JongRouter supports child routers inside components.

Example
```bash
/nested
   ├─ /nested/c1
   ├─ /nested/c2
   └─ /nested/c3
```

A parent component can create its own router instance
```js
const childRouter = new JongRouter(
  childRoutes,
  this.shadowRoot.getElementById("outlet"),
  "/nested",
  true
)

childRouter.init()
```

## Playground & Examples
Playground & Examples
The repository contains a Playground demonstrating:
* Basic routing
* Guarded routes
* Nested routes
* Query parameters
* Route parameters
* Programmatic navigation
* Buttons & router-link navigation


# Why JongRouter?
JongRouter focuses on simplicity and Web Component compatibility.
Unlike many routers, it:
* Works without frameworks
* Supports Shadow DOM
* Keeps the API extremely small
* Is easy to embed in micro-frontend architectures

Perfect for:
* Web Component apps
* Micro-frontends
* Lightweight SPAs
* Vanilla JS projects


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

