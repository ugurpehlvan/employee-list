import en from "./en.js";
import tr from "./tr.js";

const translations = {
  en,
  tr,
};

let currentLanguage = "en";

export const t = (key) => {
  return translations[currentLanguage][key] || key;
};

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);

    document.dispatchEvent(
      new CustomEvent("language-changed", { detail: { language: lang } })
    );
  } else {
    console.warn(`Language ${lang} not supported.`);
  }
};

const savedLanguage = localStorage.getItem("language");

if (savedLanguage && translations[savedLanguage]) {
  currentLanguage = savedLanguage;

  document.dispatchEvent(
    new CustomEvent("language-changed", {
      detail: { language: currentLanguage },
    })
  );
}
