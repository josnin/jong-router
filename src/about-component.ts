
export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

class About extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = 'About page'
    }

}

customElements.define('about-component', About)