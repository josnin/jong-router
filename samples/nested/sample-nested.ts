// samples/sample-nested.ts
  import JongRouter, { IRoute } from '../../src/jong-router'

  export default class SampleNested extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot!.innerHTML = `
        <h2>Nested Routes Playground</h2>
        <nav>
          <button router-link href="/nested/c1">C1</button>
          <button router-link href="/nested/c2">C2</button>
          <button router-link href="/nested/c3">C3</button>
        </nav>
        <div router-outlet></div>
      `
    }

    connectedCallback() {
      const childRoutes: IRoute[] = [
        { pattern: '/nested/c1', html: '<p>Welcome to Nested C1</p>' },
        { pattern: '/nested/c2', html: '<p>Welcome to Nested C2</p>' },
        { pattern: '/nested/c3', html: '<p>Welcome to Nested C3</p>' },
      { pattern: '**', html: '<p>Nested Page Not Found</p>' }
    ]

    const outlet = this.shadowRoot!.querySelector<HTMLElement>('[router-outlet]')!
    const childRouter = new JongRouter(childRoutes, outlet, '/nested', false)
    childRouter.init()
  }
}

customElements.define('sample-nested', SampleNested)