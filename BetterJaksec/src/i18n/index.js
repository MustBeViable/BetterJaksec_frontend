import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import fiCommon from "./locales/fi/common.json";
import deCommon from "./locales/de/common.json";
import jpCommon from "./locales/jp/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      fi: { common: fiCommon },
      de: { common: deCommon},
      jp: { common: jpCommon},
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export default i18n;