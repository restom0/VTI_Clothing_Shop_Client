import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, THEME_OPTIONS, normalizeTheme, resolveTheme } from "./theme.config";

describe("theme config", () => {
  it("defines the supported theme modes", () => {
    expect(THEME_OPTIONS.map(({ value }) => value)).toEqual(["light", "dark", "system"]);
  });

  it("normalizes invalid theme values to the default mode", () => {
    expect(normalizeTheme("dark")).toBe("dark");
    expect(normalizeTheme("unknown")).toBe(DEFAULT_THEME);
    expect(normalizeTheme()).toBe(DEFAULT_THEME);
  });

  it("resolves system theme from the browser preference", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});
