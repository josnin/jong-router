# Rawrrr
The Lion's Rawrrr ( [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) Router )

```js

import { push } from 'rawrrr'

const route = document.querySelector('router-outlet')

route.urls = [
  { path: '/home', element: 'app-root' }
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
