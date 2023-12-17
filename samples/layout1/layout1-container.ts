import JongRouter, { IRoute } from '../../src/jong-router';

export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class Layout1 extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = `

      <h2>Layout1 Example</h2>
      
      <header>
        <h2>Softdrinks</h2>
      </header>
      
      <section>
        <nav>
          <ul>
            <li><a href="/layout1/coke" router-link>Coke</a></li>
            <li><a href="/layout1/sprite" router-link>Sprite</a></li>
            <li><a href="/layout1/fanta" router-link>Fanta</a></li>
          </ul>
        </nav>
        
        <article>
          <div id="outlet1"></div>
        </article>
      </section>
      
      <footer>
        <p>Footer</p>
      </footer>

      
      `

    }

    connectedCallback() {
      console.log(this.shadowRoot?.getElementById('outlet1'));
      // Configurable variables

      const routes: IRoute[] = [

          { pattern: '/layout1/coke', html: ` Coke component` },
          { pattern: '/layout1/sprite', html: ` Sprite component` },
          { pattern: '/layout1/fanta', html: ` Fanta component` },
          { pattern: '**', html: ` Page not found!` }

      ];



      // Create an instance of the JongRouter class

      const router = new JongRouter(routes, this.shadowRoot!.getElementById('outlet1'), this.shadowRoot );



      // Initialize the router

      router.init();

    }

}

customElements.define('layout1-container', Layout1)
