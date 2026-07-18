import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

const createMetricsState = (panelOpen = true) => ({
  reactMetrics: {
    enabled: true,
    entities: {
      1: { actualDuration: 12.25, id: "home", timestamp: 2 },
      2: { actualDuration: 123.45, id: "checkout", timestamp: 1 },
    },
    events: [],
    ids: [1, 2],
    lastUpdatedAt: null,
    maxRenderSamples: 120,
    memorySamples: [{ totalJSHeapSize: 2_097_152, usedJSHeapSize: 1_048_576 }],
    panelOpen,
    renderSequence: 2,
    webMetrics: {
      "largest-contentful-paint": { value: 150.4 },
      "layout-shift": { value: 0.12 },
    },
  },
});

const installPerformanceWindow = ({ observer = true } = {}) => {
  const disconnect = vi.fn();
  const observedTypes = [];

  globalThis.window = {
    PerformanceObserver: observer
      ? class PerformanceObserver {
          constructor(callback) {
            this.callback = callback;
          }

          observe(options) {
            observedTypes.push(options.type);
            const entries =
              options.type === "layout-shift"
                ? [
                    { hadRecentInput: true, value: 1 },
                    { hadRecentInput: false, value: 0.07 },
                  ]
                : [{ duration: 60, name: options.type, startTime: 50 }];
            this.callback({ getEntries: () => entries });
          }

          disconnect = disconnect;
        }
      : undefined,
    clearInterval: vi.fn(),
    location: { pathname: "/metrics" },
    performance: {
      getEntriesByType: vi.fn((type) => {
        if (type === "navigation") return [{ duration: 400, loadEventEnd: 345 }];
        if (type === "paint") return [{ name: "first-contentful-paint", startTime: 123 }];
        return [];
      }),
      memory: {
        jsHeapSizeLimit: 4_194_304,
        totalJSHeapSize: 2_097_152,
        usedJSHeapSize: 1_048_576,
      },
    },
    setInterval: vi.fn(() => 7),
  };

  return { disconnect, observedTypes };
};

const renderMonitor = async (state) => {
  const cleanups = [];
  const dispatch = vi.fn();

  await vi.resetModules();
  vi.doMock("react", async () => {
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
  vi.doMock("react-redux", () => ({
    useDispatch: () => dispatch,
    useSelector: (selector) => selector(state),
  }));
  vi.doMock("@heroicons/react/24/outline", async () => {
    const React = await import("react");
    const Icon = (props) => React.createElement("svg", props);

    return { ChartBarIcon: Icon, TrashIcon: Icon, XMarkIcon: Icon };
  });

  const React = await import("react");
  const module = await import("./ReactMetricsMonitor.jsx");
  const markup = renderToStaticMarkup(
    React.createElement(module.default, null, React.createElement("main", null, "Shop"))
  );
  cleanups.forEach((cleanup) => cleanup());

  return { dispatch, markup, module };
};

afterEach(async () => {
  vi.doUnmock("react");
  vi.doUnmock("react-redux");
  vi.doUnmock("@heroicons/react/24/outline");
  vi.restoreAllMocks();
  delete globalThis.window;
  await vi.resetModules();
});

describe("ReactMetricsMonitor coverage", () => {
  it("renders the open metrics panel and records browser performance entries", async () => {
    const { disconnect, observedTypes } = installPerformanceWindow();
    const { dispatch, markup, module } = await renderMonitor(createMetricsState(true));

    expect(markup).toContain("React metrics");
    expect(markup).toContain("checkout: 123.5ms");
    expect(markup).toContain("1.0 MB");
    expect(observedTypes).toEqual(["paint", "largest-contentful-paint", "layout-shift"]);
    expect(disconnect).toHaveBeenCalledTimes(3);
    expect(window.clearInterval).toHaveBeenCalledWith(7);
    expect(dispatch).toHaveBeenCalled();

    const metric = module.buildReactRenderMetric("Cart", "mount", 1.234, 5.678, 9.101, 11.121);
    expect(metric).toEqual(expect.objectContaining({ actualDuration: 1.23, route: "/metrics" }));

    const renderDispatch = vi.fn();
    module.recordReactRenderSample(false, renderDispatch, "Cart", "update", 1, 2, 3, 4);
    expect(renderDispatch).not.toHaveBeenCalled();
    module.recordReactRenderSample(true, renderDispatch, "Cart", "update", 1, 2, 3, 4);
    expect(renderDispatch).toHaveBeenCalled();
  });

  it("renders the closed metrics launcher without PerformanceObserver support", async () => {
    installPerformanceWindow({ observer: false });
    const { markup } = await renderMonitor(createMetricsState(false));

    expect(markup).toContain("Open React metrics");
    expect(markup).toContain("Shop");
  });
});
