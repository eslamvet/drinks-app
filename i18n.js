import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use({
      type:'languageDetector',
      async: true,
      init: function(services, detectorOptions, i18nextOptions) {
        console.log(i18nextOptions,detectorOptions,services);
      },
      detect: function(callback) { 
        return 'en';
      },
      cacheUserLanguage: function(lng) {
        
      }
  })
  .use(initReactI18next) 
  .init({
    resources,
    // lng: "en",
    compatibilityJSON:'v3', 
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;