import { LitElement, html, css } from "lit";
import { t } from "../../localization/index.js";
import "../LanguageSelector/LanguageSelector";
import plusIcon from '../../assets/plus-icon.svg';

class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f6f6f6;
      padding: 10px;
      font-family: Arial, Helvetica, sans-serif;
    }
    img {
      width: 50px;
      height: auto;
      border-radius: 12px
    }
    a {
      text-decoration: none;
      color: #656565;
      margin: 0 10px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    .ing-link:hover {
      text-decoration: none;
      color: #f6763a;
      margin: 0 10px;
      font-weight: 500;
    }
    language-selector {
      margin-left: auto;
    }
    .menu-actions {
      display: flex;
      aligh-items: center;
    }
    .plus-icon {
      width: 24px;
    }
  `;

  constructor() {
    super();
    document.addEventListener("language-changed", () => {
      this.requestUpdate();
    });
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentViewMode = urlParams.get("viewMode") || "list";

    return html`
      <nav>
        <div>
          <a
            class='ing-link'
            href="/?page=1&viewMode=${currentViewMode}"
            @click="${this.goToFirstPage}"
          >
            <img src="/ing-logo.png" alt="Logo ING" /> ING
          </a> 
        </div>
        <div class='menu-actions'>
          <a href="/add?viewMode=${currentViewMode}">
            <img class='plus-icon' src="${plusIcon}"></img>
            ${t("addEmployee")}
          </a>
          <language-selector></language-selector>
        </div>
      </nav>
    `;
  }

  goToFirstPage(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const currentViewMode = urlParams.get("viewMode") || "list";

    const newUrl = `/?page=1&viewMode=${currentViewMode}`;
    window.location.href = newUrl;
  }
}

customElements.define("navigation-menu", NavigationMenu);
