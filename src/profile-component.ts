

export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Profile extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = 'Profile page'
    }

}

customElements.define('profile-component', Profile)