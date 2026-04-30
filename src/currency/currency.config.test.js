import { describe, expect, it } from "vitest";
import {
  BASE_CURRENCY,
  convertFromBaseCurrency,
  formatCurrencyAmount,
  getCurrencyConfigForLanguage,
  getCurrencyRate,
  getLocaleForCurrency,
  normalizeExchangeRates,
} from "./currency.config";

describe("currency config", () => {
  it("maps supported languages to display currencies", () => {
    expect(getCurrencyConfigForLanguage("en")).toEqual({
      currency: "USD",
      locale: "en-US",
    });
    expect(getCurrencyConfigForLanguage("fr")).toEqual({
      currency: "EUR",
      locale: "fr-FR",
    });
    expect(getCurrencyConfigForLanguage("unknown")).toEqual({
      currency: "USD",
      locale: "en-US",
    });
  });

  it("finds the matching locale for a display currency", () => {
    expect(getLocaleForCurrency("VND")).toBe("vi-VN");
    expect(getLocaleForCurrency("USD")).toBe("en-US");
    expect(getLocaleForCurrency("EUR")).toBe("ca-ES");
    expect(getLocaleForCurrency("GBP", "en-GB")).toBe("en-GB");
  });

  it("normalizes API rates and keeps VND as the base currency", () => {
    const rates = normalizeExchangeRates({
      base: BASE_CURRENCY,
      rates: {
        EUR: 0.000032,
        USD: 0.000038,
      },
    });

    expect(rates).toEqual({
      EUR: 0.000032,
      USD: 0.000038,
      VND: 1,
    });
    expect(getCurrencyRate(rates, "USD")).toBe(0.000038);
    expect(getCurrencyRate(rates, "VND")).toBe(1);
    expect(getCurrencyRate(rates, "MISSING")).toBeNull();
  });

  it("converts and formats prices from the base currency", () => {
    const rates = { EUR: 0.000032, USD: 0.00004, VND: 1 };
    const formattedVnd = formatCurrencyAmount(100000, "vi-VN", "VND");

    expect(convertFromBaseCurrency(100000, rates, "USD")).toBe(4);
    expect(formatCurrencyAmount(4, "en-US", "USD")).toBe("$4.00");
    expect(formattedVnd).toContain("100.000");
    expect(formattedVnd).toContain(String.fromCharCode(8363));
  });
});
