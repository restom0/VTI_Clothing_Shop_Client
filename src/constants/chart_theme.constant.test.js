import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CHART_SERIES_TOKENS,
  CHART_TITLE_FONT_SIZE,
  getChartDatasetTheme,
  getChartSeriesColor,
} from "./chart_theme.constant";

describe("chart theme tokens", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps chart token config stable", () => {
    expect(CHART_SERIES_TOKENS).toHaveLength(5);
    expect(CHART_TITLE_FONT_SIZE).toBe(20);
  });

  it("resolves chart dataset colors from CSS variables", () => {
    vi.stubGlobal("window", {
      document: { documentElement: {} },
      getComputedStyle: () => ({
        getPropertyValue: (token) =>
          token === "--chart-series-1" ? "rgb(1, 2, 3)" : "",
      }),
    });

    expect(getChartSeriesColor(0)).toBe("rgb(1, 2, 3)");
    expect(getChartDatasetTheme(1)).toEqual({
      backgroundColor: "#4bc0c0",
      borderColor: "#4bc0c0",
    });
  });
});
