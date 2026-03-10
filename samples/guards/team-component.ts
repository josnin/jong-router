export default class TeamComponent extends HTMLElement {

  connectedCallback() {

    const params = JSON.parse(this.getAttribute('route-params') || '{}')

    this.innerHTML = `
      <h2>Team Page</h2>
      <p>Team ID: ${params.teamId}</p>
    `
  }

}

customElements.define('team-component', TeamComponent)