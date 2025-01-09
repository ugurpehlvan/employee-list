import { LitElement, html, css } from "lit";
import { setLanguage } from "../../localization/index.js"; 

class LanguageSelector extends LitElement {
  static styles = css`
    .language-button {
      padding: 10px;
      cursor: pointer;
      border: none;
      font-size: 12px;
      color: #f15b15;
      background-color: transparent;
    }
  `;

  static properties = {
    currentLanguage: { type: String },
  };

  constructor() {
    super();
    this.currentLanguage = localStorage.getItem("language") || "en"; 
  }

  render() {
    return html`
      <button
        class="language-button"
        @click="${() => this.changeLanguage("tr")}"
        ?disabled="${this.currentLanguage === "tr"}"
      >
        TR
      </button>
      <button
        class="language-button"
        @click="${() => this.changeLanguage("en")}"
        ?disabled="${this.currentLanguage === "en"}"
      >
        ENG
      </button>
    `;
  }

  changeLanguage(lang) {
    setLanguage(lang); 
    this.currentLanguage = lang;
    this.requestUpdate();
  }
}

customElements.define("language-selector", LanguageSelector);
