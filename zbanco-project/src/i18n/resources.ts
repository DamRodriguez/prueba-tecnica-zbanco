import esTest from "../assets/locales/es/home/transfer.json"
import enTest from "../assets/locales/en/home/transfer.json"

export const DEFAULT_NS = "pages";

const es = {
  pages: {
    home: {

    },
    dashboard: {

    },
    test: esTest
  },
};

const en = {
  pages: {
    home: {

    },
    dashboard: {

    },
    test: enTest
  },
};

export type Resource = typeof en;

export type Resources = {
  en: Resource;
  es: Resource;
};

const resources: Resources = {
  es: es,
  en: en,
};

export default resources;
