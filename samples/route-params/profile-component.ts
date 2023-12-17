
export default class Profile extends HTMLElement {
    router: any;
    constructor() {
      super()
      this.attachShadow({ mode: 'open'})
    }

    connectedCallback() {
      // @ts-ignore
      const routeParams = JSON.parse(this.getAttribute('route-params'));
      console.log(routeParams.username)
      this.shadowRoot!.innerHTML = `Profile component, routeParams is ${JSON.stringify(routeParams)}`
    }

}

customElements.define('profile-component', Profile)