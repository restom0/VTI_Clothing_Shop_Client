import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CURRENCY_CACHE_KEY } from "./currency/currency.config";
import { CurrencyProvider, useCurrency } from "./currency/CurrencyProvider";
import { I18nProvider, useI18n } from "./i18n/I18nProvider";
import { LANGUAGE_STORAGE_KEY } from "./i18n/translations";
import { AppSeasonProvider, useSeasonMode } from "./theme/SeasonProvider";
import { AppThemeProvider, useThemeMode } from "./theme/ThemeProvider";
import { SEASON_STORAGE_KEY } from "./theme/season.config";
import { THEME_STORAGE_KEY } from "./theme/theme.config";

const createStorage = (initialValues = {}) => {
  let values = { ...initialValues };

  return {
    clear: vi.fn(() => {
      values = {};
    }),
    getItem: vi.fn((key) => values[key] ?? null),
    removeItem: vi.fn((key) => {
      delete values[key];
    }),
    setItem: vi.fn((key, value) => {
      values[key] = String(value);
    }),
  };
};

const installBrowserGlobals = (initialStorage = {}) => {
  const localStorage = createStorage(initialStorage);
  const classList = { toggle: vi.fn() };

  globalThis.window = {
    clearInterval: vi.fn(),
    localStorage,
    matchMedia: vi.fn(() => ({
      addEventListener: vi.fn(),
      matches: true,
      removeEventListener: vi.fn(),
    })),
    setInterval: vi.fn(() => 1),
  };
  globalThis.localStorage = localStorage;
  globalThis.document = {
    documentElement: {
      classList,
      dataset: {},
      lang: "",
      style: {},
    },
  };
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { language: "en-US", languages: ["en-US"] },
  });
  globalThis.fetch = vi.fn();

  return { classList, localStorage };
};

const render = (element) => renderToStaticMarkup(element);

beforeEach(() => {
  vi.clearAllMocks();
  installBrowserGlobals({
    [CURRENCY_CACHE_KEY]: JSON.stringify({
      fetchedAt: "2026-07-18T00:00:00.000Z",
      providerTimestamp: 123456,
      rates: { USD: 0.00004, VND: 1 },
    }),
    [LANGUAGE_STORAGE_KEY]: "en",
    [SEASON_STORAGE_KEY]: "winter",
    [THEME_STORAGE_KEY]: "system",
  });
});

describe("provider unit coverage", () => {
  it("provides i18n context and guards direct hook usage", () => {
    let context;
    const Probe = () => {
      context = useI18n();
      return <span>{context.language}</span>;
    };
    const BrokenProbe = () => {
      useI18n();
      return null;
    };

    expect(
      render(
        <I18nProvider>
          <Probe />
        </I18nProvider>
      )
    ).toContain("en");
    expect(context.supportedLanguages.length).toBeGreaterThan(1);
    expect(context.t("common.login")).toBeTruthy();
    context.setLanguage("not-supported");
    expect(() => render(<BrokenProbe />)).toThrow("useI18n must be used inside I18nProvider");
  });

  it("provides theme and season context values", () => {
    let themeContext;
    let seasonContext;
    const ThemeProbe = () => {
      themeContext = useThemeMode();
      return <span>{themeContext.activeTheme}</span>;
    };
    const SeasonProbe = () => {
      seasonContext = useSeasonMode();
      return <span>{seasonContext.season}</span>;
    };

    expect(
      render(
        <AppThemeProvider>
          <ThemeProbe />
        </AppThemeProvider>
      )
    ).toContain("dark");
    expect(themeContext.theme).toBe("system");
    expect(themeContext.themeOptions.map(({ value }) => value)).toContain("dark");
    themeContext.setTheme("bad-value");

    expect(
      render(
        <AppSeasonProvider>
          <SeasonProbe />
        </AppSeasonProvider>
      )
    ).toContain("winter");
    expect(seasonContext.activeSeason).toBe("winter");
    expect(seasonContext.seasonOptions.map(({ value }) => value)).toContain("auto");
    seasonContext.setSeason("bad-value");

    const BrokenTheme = () => {
      useThemeMode();
      return null;
    };
    const BrokenSeason = () => {
      useSeasonMode();
      return null;
    };

    expect(() => render(<BrokenTheme />)).toThrow(
      "useThemeMode must be used inside AppThemeProvider"
    );
    expect(() => render(<BrokenSeason />)).toThrow(
      "useSeasonMode must be used inside AppSeasonProvider"
    );
  });

  it("provides currency formatting from cached exchange rates", () => {
    let currencyContext;
    const Probe = () => {
      currencyContext = useCurrency();
      return (
        <span>
          {currencyContext.currency}:{currencyContext.rate}
        </span>
      );
    };
    const BrokenProbe = () => {
      useCurrency();
      return null;
    };

    expect(
      render(
        <I18nProvider>
          <CurrencyProvider>
            <Probe />
          </CurrencyProvider>
        </I18nProvider>
      )
    ).toContain("USD");
    expect(currencyContext.baseCurrency).toBe("VND");
    expect(currencyContext.convertPrice(100000, "USD")).toBe(4);
    expect(currencyContext.formatPrice(100000)).toContain("$");
    expect(currencyContext.formatPrice(100000, "UNKNOWN")).toContain("₫");
    expect(currencyContext.lastUpdated).toBe(123456);
    expect(() => render(<BrokenProbe />)).toThrow(
      "useCurrency must be used inside CurrencyProvider"
    );
  });
});
