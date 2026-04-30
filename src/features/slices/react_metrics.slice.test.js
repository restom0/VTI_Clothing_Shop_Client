import { describe, expect, it } from "vitest";
import reducer, {
  clearReactMetrics,
  recordMemorySample,
  recordReactRender,
  recordWebMetric,
  selectReactMetricsSummary,
  toggleReactMetricsPanel,
} from "./react_metrics.slice";

const buildState = (reactMetrics) => ({ reactMetrics });

describe("react metrics slice", () => {
  it("records and summarizes render samples", () => {
    let state = reducer(undefined, recordReactRender({
      actualDuration: 12,
      baseDuration: 18,
      commitTime: 20,
      componentId: "App",
      phase: "mount",
      route: "/",
      startTime: 8,
      timestamp: 100,
    }));

    state = reducer(state, recordReactRender({
      actualDuration: 4,
      baseDuration: 9,
      commitTime: 31,
      componentId: "App",
      phase: "update",
      route: "/product",
      startTime: 27,
      timestamp: 200,
    }));

    const summary = selectReactMetricsSummary(buildState(state));

    expect(summary.renderCount).toBe(2);
    expect(summary.averageRenderDuration).toBe(8);
    expect(summary.slowestRender.actualDuration).toBe(12);
  });

  it("records browser metrics and memory samples", () => {
    let state = reducer(undefined, recordWebMetric({
      name: "largest-contentful-paint",
      route: "/",
      timestamp: 100,
      value: 900,
    }));

    state = reducer(state, recordMemorySample({
      route: "/",
      timestamp: 200,
      usedJSHeapSize: 1024,
      totalJSHeapSize: 2048,
      jsHeapSizeLimit: 4096,
    }));

    const summary = selectReactMetricsSummary(buildState(state));

    expect(summary.webMetrics["largest-contentful-paint"].value).toBe(900);
    expect(summary.latestMemorySample.usedJSHeapSize).toBe(1024);
  });

  it("toggles panel and clears collected samples", () => {
    let state = reducer(undefined, toggleReactMetricsPanel());
    state = reducer(state, recordReactRender({
      actualDuration: 1,
      baseDuration: 1,
      commitTime: 1,
      componentId: "App",
      phase: "mount",
      route: "/",
      startTime: 1,
      timestamp: 1,
    }));

    expect(state.panelOpen).toBe(true);
    expect(state.ids).toHaveLength(1);

    state = reducer(state, clearReactMetrics());

    expect(state.ids).toHaveLength(0);
    expect(state.events).toHaveLength(0);
    expect(state.memorySamples).toHaveLength(0);
  });
});
