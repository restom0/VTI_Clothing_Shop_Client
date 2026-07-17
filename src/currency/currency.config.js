export const BASE_CURRENCY = "VND";
export const BASE_CURRENCY_LOCALE = "vi-VN";
export const CURRENCY_CACHE_KEY = "vti-shop-currency-rates";
export const EXCHANGE_RATE_API_URL = "https://fxapi.app/api/vnd.json";
export const EXCHANGE_RATE_REFRESH_MS = 5 * 60 * 1000;

export const LOCALE_CURRENCY_CONFIG = {
  en: { currency: "USD", locale: "en-US" },
  ca: { currency: "EUR", locale: "ca-ES" },
  it: { currency: "EUR", locale: "it-IT" },
  es: { currency: "EUR", locale: "es-ES" },
  de: { currency: "EUR", locale: "de-DE" },
  fr: { currency: "EUR", locale: "fr-FR" },
};

const ZERO_FRACTION_CURRENCIES = new Set(["VND", "JPY", "KRW"]);

/** Gets currency config for language. */
export const getCurrencyConfigForLanguage = (language) =>
  LOCALE_CURRENCY_CONFIG[language] ?? LOCALE_CURRENCY_CONFIG.en;

/** Gets locale for currency. */
export const getLocaleForCurrency = (currency, fallbackLocale = BASE_CURRENCY_LOCALE) => {
  if (currency === BASE_CURRENCY) return BASE_CURRENCY_LOCALE;

  return (
    Object.values(LOCALE_CURRENCY_CONFIG).find(
      ({ currency: configuredCurrency }) => configuredCurrency === currency
    )?.locale ?? fallbackLocale
  );
};

/** Gets currency fraction digits. */
export const getCurrencyFractionDigits = (currency) =>
  ZERO_FRACTION_CURRENCIES.has(currency) ? 0 : 2;

/** Normalizes exchange rates. */
export const normalizeExchangeRates = (payload) => {
  if (!payload || payload.base !== BASE_CURRENCY || !payload.rates) {
    return null;
  }

  return {
    ...payload.rates,
    [BASE_CURRENCY]: 1,
  };
};

/** Gets currency rate. */
export const getCurrencyRate = (rates, currency) => {
  if (currency === BASE_CURRENCY) return 1;

  const rate = rates?.[currency];
  return Number.isFinite(rate) && rate > 0 ? rate : null;
};

/** Handles convert from base currency. */
export const convertFromBaseCurrency = (amount, rates, currency) => {
  const numericAmount = Number(amount ?? 0);
  const rate = getCurrencyRate(rates, currency) ?? 1;

  return numericAmount * rate;
};

/** Formats currency amount. */
export const formatCurrencyAmount = (amount, locale, currency) => {
  const fractionDigits = getCurrencyFractionDigits(currency);

  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
    style: "currency",
  }).format(Number(amount ?? 0));
};
