# GRawrrrl
The Lion's GRawrrrl ( [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) Router )

```js

import { push } from 'GRawrrrl'

const route = document.querySelector('router-outlet') // base?

route.urls = [
  { path: '/home', component: 'home-page'},
  path('/login', 'login-page'),
  path('/page2', include('route2.urls'),
  
]

```

```html

<button ${ push('/home') }> Go </button>

<!-- or -->
<router-link go="/home">
  <button> Go </button>
</router-link>

<router-outlet></router-outlet>
```
