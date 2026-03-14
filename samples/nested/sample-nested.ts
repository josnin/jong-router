
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

}

customElements.define('sample-nested', SampleNested)