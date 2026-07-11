import { describe, expect, it } from "vitest";
import {
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES,
  interpolateMessage,
  normalizeLanguage,
  translate,
  translations,
} from "./translations";

describe("i18n translations", () => {
  it("loads labels for every supported language", () => {
    const fallbackKeys = Object.keys(translations[FALLBACK_LANGUAGE]);

    expect(SUPPORTED_LANGUAGES.map(({ code }) => code)).toEqual([
      "vi",
      "en",
      "ca",
      "it",
      "es",
      "de",
      "fr",
    ]);

    SUPPORTED_LANGUAGES.forEach(({ code }) => {
      expect(translations[code]).toBeDefined();
      expect(Object.keys(translations[code]).sort()).toEqual(fallbackKeys.sort());
    });
  });

  it("normalizes browser locale values to supported language codes", () => {
    expect(normalizeLanguage("en-US")).toBe("en");
    expect(normalizeLanguage("FR-fr")).toBe("fr");
    expect(normalizeLanguage("vi-VN")).toBe("vi");
    expect(normalizeLanguage("ru-RU")).toBeNull();
    expect(normalizeLanguage()).toBeNull();
  });

  it("translates labels and interpolates params", () => {
    expect(translate("de-DE", "common.search")).toBe("Suche");
    expect(translate("es", "common.items", { count: 3 })).toBe("3 productos");
    expect(translate("vi", "common.search")).toBe("Tìm kiếm");
    expect(interpolateMessage("Hello {name}", { name: "VTI" })).toBe("Hello VTI");
  });

  it("falls back to Vietnamese and then to the key", () => {
    expect(translate("ru", "common.search")).toBe("Tìm kiếm");
    expect(translate("fr", "missing.translation.key")).toBe("missing.translation.key");
  });
});
