import { Profiler, useEffect } from "react";
import PropTypes from "prop-types";
import { ChartBarIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  clearReactMetrics,
  recordMemorySample,
  recordReactRender,
  recordWebMetric,
  selectReactMetricsSummary,
  toggleReactMetricsPanel,
} from "../../features/slices/react_metrics.slice";

const formatMs = (value) => `${Number(value ?? 0).toFixed(1)}ms`;

const formatBytes = (value) => {
  if (!Number.isFinite(value)) return "n/a";

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
};

const getMetricValue = (metric) =>
  metric ? Number(metric.value ?? 0).toFixed(metric.value > 100 ? 0 : 2) : "n/a";

const useBrowserPerformanceMetrics = (enabled) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.performance) {
      return undefined;
    }

    const recordPerformanceEntry = (entry, name = entry.name) => {
      dispatch(
        recordWebMetric({
          name,
          route: window.location.pathname,
          timestamp: Date.now(),
          value: Number(entry.startTime ?? entry.duration ?? 0),
        })
      );
    };

    window.performance.getEntriesByType("navigation").forEach((entry) => {
      dispatch(
        recordWebMetric({
          name: "navigation-load",
          route: window.location.pathname,
          timestamp: Date.now(),
          value: Number(entry.loadEventEnd ?? entry.duration ?? 0),
        })
      );
    });

    window.performance.getEntriesByType("paint").forEach((entry) => recordPerformanceEntry(entry));

    if (!("PerformanceObserver" in window)) {
      return undefined;
    }

    const observers = [];
    const observe = (type, handler) => {
      try {
        const observer = new window.PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => handler(entry));
        });
        observer.observe({ type, buffered: true });
        observers.push(observer);
      } catch {
        // Some browsers do not expose every entry type.
      }
    };

    observe("paint", (entry) => recordPerformanceEntry(entry));
    observe("largest-contentful-paint", (entry) =>
      recordPerformanceEntry(entry, "largest-contentful-paint")
    );
    observe("layout-shift", (entry) => {
      if (entry.hadRecentInput) return;
      dispatch(
        recordWebMetric({
          name: "layout-shift",
          route: window.location.pathname,
          timestamp: Date.now(),
          value: Number(entry.value ?? 0),
        })
      );
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [dispatch, enabled]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return undefined;

    const recordMemory = () => {
      const memory = window.performance?.memory;
      if (!memory) return;

      dispatch(
        recordMemorySample({
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          route: window.location.pathname,
          timestamp: Date.now(),
          totalJSHeapSize: memory.totalJSHeapSize,
          usedJSHeapSize: memory.usedJSHeapSize,
        })
      );
    };

    recordMemory();
    const intervalId = window.setInterval(recordMemory, 10000);

    return () => window.clearInterval(intervalId);
  }, [dispatch, enabled]);
};

const MetricLine = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 text-xs">
    <span className="text-text-muted">{label}</span>
    <span className="font-semibold text-text-base">{value}</span>
  </div>
);

MetricLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const ReactMetricsPanel = () => {
  const dispatch = useDispatch();
  const panelOpen = useSelector((state) => state.reactMetrics.panelOpen);
  const summary = useSelector(selectReactMetricsSummary);
  const webMetrics = summary.webMetrics;

  if (!panelOpen) {
    return (
      <button
        type="button"
        className="fixed bottom-4 right-4 z-[300] inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-panel"
        onClick={() => dispatch(toggleReactMetricsPanel())}
        aria-label="Open React metrics"
      >
        <ChartBarIcon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[300] w-[20rem] rounded-lg border border-border bg-white p-4 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-base">React metrics</p>
          <p className="text-xs text-text-muted">Profiler + browser timings</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="btn-ghost p-2"
            onClick={() => dispatch(clearReactMetrics())}
            aria-label="Clear React metrics"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn-ghost p-2"
            onClick={() => dispatch(toggleReactMetricsPanel())}
            aria-label="Close React metrics"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <MetricLine label="Render samples" value={String(summary.renderCount)} />
        <MetricLine label="Avg render" value={formatMs(summary.averageRenderDuration)} />
        <MetricLine
          label="Slowest render"
          value={
            summary.slowestRender
              ? `${summary.slowestRender.id}: ${formatMs(summary.slowestRender.actualDuration)}`
              : "n/a"
          }
        />
        <MetricLine label="FCP" value={getMetricValue(webMetrics["first-contentful-paint"])} />
        <MetricLine label="LCP" value={getMetricValue(webMetrics["largest-contentful-paint"])} />
        <MetricLine label="CLS latest" value={getMetricValue(webMetrics["layout-shift"])} />
        <MetricLine
          label="JS heap"
          value={formatBytes(summary.latestMemorySample?.usedJSHeapSize)}
        />
      </div>
    </aside>
  );
};

const ReactMetricsMonitor = ({ children }) => {
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.reactMetrics.enabled);
  const shouldMonitor = import.meta.env.DEV || import.meta.env.VITE_ENABLE_REACT_MONITOR === "true";

  useBrowserPerformanceMetrics(shouldMonitor && enabled);

  if (!shouldMonitor) return children;

  const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    if (!enabled) return;

    dispatch(
      recordReactRender({
        actualDuration: Number(actualDuration.toFixed(2)),
        baseDuration: Number(baseDuration.toFixed(2)),
        commitTime: Number(commitTime.toFixed(2)),
        componentId: id,
        phase,
        route: typeof window === "undefined" ? "unknown" : window.location.pathname,
        startTime: Number(startTime.toFixed(2)),
        timestamp: Date.now(),
      })
    );
  };

  return (
    <>
      <Profiler id="VTI-Shop" onRender={onRender}>
        {children}
      </Profiler>
      <ReactMetricsPanel />
    </>
  );
};

ReactMetricsMonitor.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReactMetricsMonitor;
