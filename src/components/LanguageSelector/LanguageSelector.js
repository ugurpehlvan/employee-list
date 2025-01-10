import { LitElement, html, css } from "lit";
import { setLanguage } from "../../localization/index.js"; 
import turkishFlag from '../../assets/turkish-flag.svg';
import englandFlag from '../../assets/england-flag.svg';

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
        @click="${() => this.changeLanguage(this.currentLanguage === 'tr' ? 'en' : 'tr')}"
        ?disabled="${this.currentLanguage === (this.currentLanguage === 'tr' ? 'en' : 'tr')}"
      >
        ${this.currentLanguage === 'tr'
          ? html `<img class='turkish-flag' src="${turkishFlag}"></img>`
          : html`<img class='turkish-flag' src="${englandFlag}"></img>`
        }
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
