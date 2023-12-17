

export default class Profile extends HTMLElement {
    router: any;
    constructor() {
      super()
      this.attachShadow({ mode: 'open'})
    }

    connectedCallback() {
      // @ts-ignore
      const queryParams = JSON.parse(this.getAttribute('query-params'));
      console.log(queryParams)
      this.shadowRoot!.innerHTML = `Profile component, queryParams is ${JSON.stringify(queryParams)}`
    }

}

customElements.define('profile-component', Profile)