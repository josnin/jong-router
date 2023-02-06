# GRawrrrl
The Lion's GRawrrrl ( [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) Router )

```js

import { push } from 'GRawrrrl'

const route = this.shadowRoot.querySelector('router-outlet') // base?

route.urls = [
 
  { 
    path: '', 
    component: 'layout-main', 
    children: [
      { 
        path: 'customer', 
        component: 'customer-main'
      }
    ] 
  },
 
  
]

```

```html

<router-link go="/home">
  <button> Go </button>
</router-link>

<router-outlet></router-outlet>
```
