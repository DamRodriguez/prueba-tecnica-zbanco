import esTransfer from "../assets/locales/es/home/transfer.json"
import enTransfer from "../assets/locales/en/home/transfer.json"
import esToast from "../assets/locales/es/toast/toast.json"
import enToast from "../assets/locales/en/toast/toast.json"
import esTransferHistory from "../assets/locales/es/home/transferHistory.json"
import enTransferHistory from "../assets/locales/en/home/transferHistory.json"
import esDashboard from "../assets/locales/es/dashboard.json"
import enDashboard from "../assets/locales/en/dashboard.json"
import esCrypto from "../assets/locales/es/home/crypto.json"
import enCrypto from "../assets/locales/en/home/crypto.json"
import esHeader from "../assets/locales/es/layout/header.json"
import enHeader from "../assets/locales/en/layout/header.json"
import esNav from "../assets/locales/es/layout/nav.json"
import enNav from "../assets/locales/en/layout/nav.json"

export const DEFAULT_NS = "main";

const es = {
  main: {
    pages: {
      home: {
        transfer: esTransfer,
        transferHistory: esTransferHistory,
        crypto: esCrypto
      },
      dashboard: esDashboard,
    },
    layout: {
      header: esHeader,
      nav: esNav
    },
    toast: esToast
  }
};

const en = {
  main: {
    pages: {
      home: {
        transfer: enTransfer,
        transferHistory: enTransferHistory,
        crypto: enCrypto
      },
      dashboard: enDashboard,
    },
    layout: {
      header: enHeader,
      nav: enNav
    },
    toast: enToast
  }
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
