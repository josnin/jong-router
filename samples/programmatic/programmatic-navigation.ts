import { router } from "../../router-instance"

export default class ProgrammaticNavigation extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: "open" })

    this.shadowRoot!.innerHTML = `

      <style>

        .container {
          padding: 20px;
        }

        button {
          margin: 6px;
          padding: 8px 14px;
          border-radius: 6px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        button:hover {
          background: #2563eb;
          color: white;
        }

      </style>

      <div class="container">

        <h2>Programmatic Navigation</h2>

        <p>This component demonstrates <b>router.navigateTo()</b></p>

        <button id="about">Go About</button>

        <button id="profile">Go Profile (admin)</button>

        <button id="query">Profile With Query</button>

        <button id="random">Random Profile</button>

        <button id="notfound">Go 404</button>

      </div>
    `
  }

  connectedCallback() {

    this.shadowRoot!.getElementById("about")!
      .addEventListener("click", () => {
        router.navigateTo("/about")
      })

    this.shadowRoot!.getElementById("profile")!
      .addEventListener("click", () => {
        router.navigateTo("/profile/admin")
      })

    this.shadowRoot!.getElementById("query")!
      .addEventListener("click", () => {
        router.navigateTo("/profile/jong?tab=settings")
      })

    this.shadowRoot!.getElementById("random")!
      .addEventListener("click", () => {

        const users = ["alice", "bob", "charlie"]
        const user = users[Math.floor(Math.random() * users.length)]

        router.navigateTo(`/profile/${user}`)

      })

    this.shadowRoot!.getElementById("notfound")!
      .addEventListener("click", () => {
        router.navigateTo("/some-random-url")
      })

  }

}

customElements.define(
  "programmatic-navigation",
  ProgrammaticNavigation
)