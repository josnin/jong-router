export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Home extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)

      // @ts-ignore
      const routeParams = JSON.parse(this.getAttribute('route-params'));
      console.log(routeParams)
      this.shadowRoot!.innerHTML = 'Home page'
    }

}

customElements.define('home-component', Home)