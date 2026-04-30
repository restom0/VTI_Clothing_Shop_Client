export const THEME_STORAGE_KEY = "vti-shop-theme";
export const DEFAULT_THEME = "system";

export const THEME_OPTIONS = [
  { value: "light", labelKey: "theme.light" },
  { value: "dark", labelKey: "theme.dark" },
  { value: "system", labelKey: "theme.system" },
];

export const normalizeTheme = (theme) =>
  THEME_OPTIONS.some(({ value }) => value === theme) ? theme : DEFAULT_THEME;

export const resolveTheme = (theme, prefersDark) => {
  const normalizedTheme = normalizeTheme(theme);

  if (normalizedTheme === "system") {
    return prefersDark ? "dark" : "light";
  }

  return normalizedTheme;
};
