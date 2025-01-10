import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import "./components/navigation/NavigationMenu.js";
import "./components/employees/EmployeeList.js";
import "./components/employees/EmployeeForm.js";
import "./components/LanguageSelector/LanguageSelector.js";


class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector("#outlet");
    const router = new Router(outlet);
    router.setRoutes([
      { path: "/", component: "employee-list" },
      { path: "/add", component: "employee-form" },
      { path: "/edit/:id", component: "employee-form" },
    ]);
  }

  render() {
    return html`
      <navigation-menu></navigation-menu>
      <div id="outlet"></div>
    `;
  }
}

customElements.define("employee-app", App);
