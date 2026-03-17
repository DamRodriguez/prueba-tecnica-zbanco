import esTransfer from "../assets/locales/es/home/transfer.json"
import enTransfer from "../assets/locales/en/home/transfer.json"
import esToast from "../assets/locales/es/toast/toast.json"
import enToast from "../assets/locales/en/toast/toast.json"
import esTransferHistory from "../assets/locales/es/home/transferHistory.json"
import enTransferHistory from "../assets/locales/en/home/transferHistory.json"

export const DEFAULT_NS = "main";

const es = {
  main: {
    pages: {
      home: {
        transfer: esTransfer,
        transferHistory: esTransferHistory,
      },
      dashboard: {

      },
    },
    toast: esToast
  }
};

const en = {
  main: {
    pages: {
      home: {
        transfer: enTransfer,
        transferHistory: enTransferHistory
      },
      dashboard: {

      },
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
