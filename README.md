# GRawrrrl
The Lion's GRawrrrl ( [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) Router )

```js

import { push } from 'GRawrrrl'

const route = this.shadowRoot.querySelector('router-outlet') // base?

route.urls = [
 
  { 
    path: 'customer', 
    component: 'customer-main', 
    children: [
      { 
        path: '', 
        loadComponent: () => import("./customers/customerMain") 
      }
    ] 
  },
 
  
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
