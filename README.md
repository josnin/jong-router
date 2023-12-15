# jong-router
Simplified web components router, enhance user experience with a minimalistic yet powerful solution

### Key Features:

* Simple integration with web components architecture
* Dynamic routing for single page applications
* Customizable route configurations
* Efficient and smooth navigation transitions

### Getting Started:

```js

import { push } from 'webcomp-router'

const route = this.shadowRoot.querySelector('router-outlet') // base?

route.urls = [
 
  { 
    path: '', 
    comp: 'layout-main',
    html: `<div></di>`
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
