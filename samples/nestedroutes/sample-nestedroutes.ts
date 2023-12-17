import JongRouter, { IRoute } from '../../src/jong-router';

export const attachShadow: ShadowRootInit = {
    mode: 'open', 
    delegatesFocus: true 
}

export default class SampleNestedRoutes extends HTMLElement {
    constructor() {
      super()
      this.attachShadow(attachShadow)
      this.shadowRoot!.innerHTML = `
        <h2>Sample Nested Routes</h2>
        <nav>
          <ul>
            <li><a href="/nestedroutes/c1" router-link>Component1</a></li>
            <li><a href="/nestedroutes/c2" router-link>Component2</a></li>
            <li><a href="/nestedroutes/c3" router-link>Component3</a></li>
          </ul>
        </nav>
        <div id="outlet1"></div>
      `
    }

    connectedCallback() {

      const childRoutes: IRoute[] = [

          { pattern: '/nestedroutes/c1', html: ` Welcome Component1 Page` },
          { pattern: '/nestedroutes/c2', html: ` Welcome Component2 Page` },
          { pattern: '/nestedroutes/c3', html: ` Welcome Component3 Page` },
          { pattern: '**', html: ` Page not found!` }

      ];

      // Create an instance of the JongRouter class
      const router = new JongRouter(childRoutes, this.shadowRoot!.getElementById('outlet1'), this.shadowRoot );

      // Initialize the router
      router.init();

    }

}

customElements.define('sample-nestedroutes', SampleNestedRoutes)
