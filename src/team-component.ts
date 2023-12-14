
export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Team extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
    }

    connectedCallback() {
      console.log("Custom element added to page.");
      // @ts-ignore
      const routeParams = JSON.parse(this.getAttribute('route-params'));
      console.log(routeParams)
      this.shadowRoot!.innerHTML = `Team component, routeParams is ${JSON.stringify(routeParams)}`
    }

}

customElements.define('team-component', Team)