import {
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  translations,
} from "./generated/labels.js";

export {
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  translations,
};

export const normalizeLanguage = (language) => {
  if (!language) return null;

  const languageCode = language.toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.some(({ code }) => code === languageCode)
    ? languageCode
    : null;
};

export const interpolateMessage = (template, params = {}) =>
  Object.entries(params).reduce(
    (message, [key, value]) =>
      message.replace(new RegExp(`\\{${key}\\}`, "g"), String(value)),
    template
  );

export const translate = (language, key, params) => {
  const normalizedLanguage = normalizeLanguage(language) ?? FALLBACK_LANGUAGE;
  const labels = translations[normalizedLanguage] ?? translations[FALLBACK_LANGUAGE];
  const fallbackLabels = translations[FALLBACK_LANGUAGE];
  const template = labels[key] ?? fallbackLabels[key] ?? key;

  return interpolateMessage(template, params);
};
