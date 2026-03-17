import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources, { DEFAULT_NS } from "./resources";
import { lang } from "../config/lang";

export type Locale = keyof typeof resources;
const defaultLanguage = lang.i18n.defaultLanguage || "es";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: import.meta.env.DEV,
    defaultNS: DEFAULT_NS,
    interpolation: { escapeValue: false },
  });

export default i18n;