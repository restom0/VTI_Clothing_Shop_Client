import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
  translate,
} from "./translations";

const I18nContext = createContext(null);

const detectBrowserLanguage = () => {
  if (typeof navigator === "undefined") return null;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];

  return languages.map(normalizeLanguage).find(Boolean) ?? null;
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") return FALLBACK_LANGUAGE;

  const storedLanguage = normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));

  return storedLanguage ?? detectBrowserLanguage() ?? FALLBACK_LANGUAGE;
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(normalizeLanguage(nextLanguage) ?? FALLBACK_LANGUAGE);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const t = (key, params) => translate(language, key, params);

    return {
      language,
      setLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t,
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
};
