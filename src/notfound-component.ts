


export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class NotFound extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = 'NotFound page'
    }

}

customElements.define('notfound-component', NotFound)