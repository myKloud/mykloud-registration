import { LANGUAGE } from "./types";

export const setLanguage = (lang) => ({
  type: LANGUAGE,
  lang,
});
