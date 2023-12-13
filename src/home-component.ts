export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

class Home extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = 'Home page'
    }

}

customElements.define('home-component', Home)