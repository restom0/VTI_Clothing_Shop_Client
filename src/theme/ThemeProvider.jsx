import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  DEFAULT_THEME,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  normalizeTheme,
  resolveTheme,
} from "./theme.config";

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  return normalizeTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
};

const getPrefersDark = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
};

const applyThemeToDocument = (activeTheme) => {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.classList.toggle("dark", activeTheme === "dark");
  document.documentElement.style.colorScheme = activeTheme;
};

export const AppThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [prefersDark, setPrefersDark] = useState(getPrefersDark);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(normalizeTheme(nextTheme));
  }, []);

  const activeTheme = resolveTheme(theme, prefersDark);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    applyThemeToDocument(activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updatePreference = (event) => setPrefersDark(event.matches);

    mediaQuery.addEventListener?.("change", updatePreference);

    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  const value = useMemo(
    () => ({
      activeTheme,
      setTheme,
      theme,
      themeOptions: THEME_OPTIONS,
    }),
    [activeTheme, setTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside AppThemeProvider");
  }

  return context;
};
