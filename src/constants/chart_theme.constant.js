export const CHART_SERIES_TOKENS = Object.freeze([
  { token: "--chart-series-1", fallback: "#326464" },
  { token: "--chart-series-2", fallback: "#4bc0c0" },
  { token: "--chart-series-3", fallback: "#006edc" },
  { token: "--chart-series-4", fallback: "#ff9800" },
  { token: "--chart-series-5", fallback: "#7e57c2" },
]);

export const CHART_TITLE_FONT_SIZE = 20;

export const getCssTokenValue = (token, fallback) => {
  if (typeof window === "undefined") return fallback;

  const value = window
    .getComputedStyle(window.document.documentElement)
    .getPropertyValue(token)
    .trim();

  return value || fallback;
};

export const getChartSeriesColor = (index) => {
  const series = CHART_SERIES_TOKENS[index % CHART_SERIES_TOKENS.length];

  return getCssTokenValue(series.token, series.fallback);
};

export const getChartDatasetTheme = (index) => {
  const color = getChartSeriesColor(index);

  return {
    backgroundColor: color,
    borderColor: color,
  };
};
