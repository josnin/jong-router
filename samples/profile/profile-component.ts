export default class ProfileComponent extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {

    const params = JSON.parse(this.getAttribute('route-params') || '{}')

    const query = new URLSearchParams(window.location.search)

    this.shadowRoot!.innerHTML = `
      <h2>Profile Page</h2>

      <p><b>Username:</b> ${params.username}</p>

      <p><b>Query tab:</b> ${query.get('tab') || 'none'}</p>

      <a router-link href="/about">Go About</a>
    `
  }

}

customElements.define('profile-component', ProfileComponent)