import "i18next";
import resources from "./resources";
import { DEFAULT_NS } from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: typeof resources["en"];
  }
}