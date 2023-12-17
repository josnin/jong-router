

export default class History extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open'})
    }

    connectedCallback() {
      // @ts-ignore
      const routeData = JSON.parse(this.getAttribute('route-data'));
      console.log(routeData)
      this.shadowRoot!.innerHTML = `History component, routeData is ${JSON.stringify(routeData)}`
    }

}

customElements.define('history-component', History)