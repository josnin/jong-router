
export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Team extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = 'Team page'
    }

}

customElements.define('team-component', Team)