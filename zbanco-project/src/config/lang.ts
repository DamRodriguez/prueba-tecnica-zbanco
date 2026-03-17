import type { Locale } from "../i18n/i18n";

type Language = {
  i18n: {
    defaultLanguage: Locale;
  };
};

export const lang: Language = {
  i18n: {
    defaultLanguage: "es",
  },
};
