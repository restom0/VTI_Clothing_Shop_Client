import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY } from "./theme.config";

const cleanups = vi.hoisted(() => []);

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  const useEffect = (effect) => {
    const cleanup = effect();
    if (typeof cleanup === "function") cleanups.push(cleanup);
  };

  return {
    ...actual,
    default: { ...actual.default, useEffect },
    useEffect,
  };
});

afterEach(() => {
  cleanups.length = 0;
  delete globalThis.window;
  delete globalThis.document;
});

describe("ThemeProvider effect coverage", () => {
  it("persists and applies the active theme, then removes media listeners", async () => {
    const classList = { toggle: vi.fn() };
    const mediaQuery = {
      addEventListener: vi.fn(),
      matches: true,
      removeEventListener: vi.fn(),
    };
    globalThis.window = {
      localStorage: {
        getItem: vi.fn(() => "system"),
        setItem: vi.fn(),
      },
      matchMedia: vi.fn(() => mediaQuery),
    };
    globalThis.document = {
      documentElement: {
        classList,
        dataset: {},
        style: {},
      },
    };

    const React = await import("react");
    const { AppThemeProvider, useThemeMode } = await import("./ThemeProvider.jsx");
    let context;
    const Probe = () => {
      context = useThemeMode();
      return React.createElement("span", null, context.activeTheme);
    };

    expect(
      renderToStaticMarkup(React.createElement(AppThemeProvider, null, React.createElement(Probe)))
    ).toContain("dark");

    context.setTheme("light");
    cleanups.forEach((cleanup) => cleanup());

    expect(window.localStorage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, "system");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(classList.toggle).toHaveBeenCalledWith("dark", true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(mediaQuery.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
