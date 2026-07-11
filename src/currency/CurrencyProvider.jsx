import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useI18n } from "../i18n";
import {
  BASE_CURRENCY,
  BASE_CURRENCY_LOCALE,
  CURRENCY_CACHE_KEY,
  EXCHANGE_RATE_API_URL,
  EXCHANGE_RATE_REFRESH_MS,
  convertFromBaseCurrency,
  formatCurrencyAmount,
  getCurrencyConfigForLanguage,
  getCurrencyRate,
  getLocaleForCurrency,
  normalizeExchangeRates,
} from "./currency.config";

const CurrencyContext = createContext(null);

const fallbackRates = { [BASE_CURRENCY]: 1 };

const readCachedRates = () => {
  if (typeof window === "undefined") return null;

  try {
    const cached = JSON.parse(window.localStorage.getItem(CURRENCY_CACHE_KEY));

    if (!cached?.rates) return null;
    return cached;
  } catch {
    return null;
  }
};

const writeCachedRates = (cachePayload) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(cachePayload));
};

const fetchExchangeRates = async (signal) => {
  const response = await fetch(EXCHANGE_RATE_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Currency rates request failed: ${response.status}`);
  }

  const payload = await response.json();
  const rates = normalizeExchangeRates(payload);

  if (!rates) {
    throw new Error("Currency rates response is invalid");
  }

  return {
    fetchedAt: new Date().toISOString(),
    providerTimestamp: payload.timestamp,
    rates,
  };
};

export const CurrencyProvider = ({ children }) => {
  const { language } = useI18n();
  const cachedRates = useMemo(readCachedRates, []);
  const [rates, setRates] = useState(cachedRates?.rates ?? fallbackRates);
  const [lastUpdated, setLastUpdated] = useState(
    cachedRates?.providerTimestamp ?? cachedRates?.fetchedAt ?? null
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const { currency, locale } = getCurrencyConfigForLanguage(language);

  const refreshRates = useCallback(async (options = {}) => {
    const { signal, silent = false } = options;

    if (!silent) setIsUpdating(true);
    setError(null);

    try {
      const nextCache = await fetchExchangeRates(signal);
      setRates(nextCache.rates);
      setLastUpdated(nextCache.providerTimestamp ?? nextCache.fetchedAt);
      writeCachedRates(nextCache);
    } catch (requestError) {
      if (requestError.name === "AbortError") return;
      setError(requestError.message);
    } finally {
      if (!silent) setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    refreshRates({ signal: controller.signal, silent: Boolean(cachedRates) });

    const intervalId = window.setInterval(() => {
      refreshRates({ silent: true });
    }, EXCHANGE_RATE_REFRESH_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [cachedRates, refreshRates]);

  const value = useMemo(() => {
    const activeRate = getCurrencyRate(rates, currency);
    const displayCurrency = activeRate ? currency : BASE_CURRENCY;
    const displayLocale = activeRate ? locale : BASE_CURRENCY_LOCALE;

    const convertPrice = (amount, targetCurrency = currency) =>
      convertFromBaseCurrency(amount, rates, targetCurrency);

    const formatPrice = (amount, targetCurrency = currency) => {
      const targetRate = getCurrencyRate(rates, targetCurrency);
      const safeCurrency = targetRate ? targetCurrency : BASE_CURRENCY;
      const safeLocale =
        safeCurrency === currency && targetRate
          ? locale
          : getLocaleForCurrency(safeCurrency, locale);

      return formatCurrencyAmount(
        convertFromBaseCurrency(amount, rates, safeCurrency),
        safeLocale,
        safeCurrency
      );
    };

    return {
      baseCurrency: BASE_CURRENCY,
      convertPrice,
      currency: displayCurrency,
      error,
      formatPrice,
      isUpdating,
      lastUpdated,
      locale: displayLocale,
      rate: getCurrencyRate(rates, displayCurrency) ?? 1,
      rates,
      refreshRates,
      requestedCurrency: currency,
    };
  }, [currency, error, isUpdating, lastUpdated, locale, rates, refreshRates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
