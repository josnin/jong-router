

export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Profile extends HTMLElement {
    router: any;
    constructor() {
      super()
      this.attachShadow(attachShadow)
    }

    connectedCallback() {
      console.log("Custom element added to page.");
      // @ts-ignore
      const routeParams = JSON.parse(this.getAttribute('route-params'));
      console.log(routeParams)
      const routeData = JSON.parse(this.getAttribute('route-data')!);
      console.log(routeData)
      this.shadowRoot!.innerHTML = `Profile component, routeParams is ${JSON.stringify(routeParams)}`
      //this.router.navigateTo('/about')
    }

}

customElements.define('profile-component', Profile)