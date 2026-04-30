import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const MAX_RENDER_SAMPLES = 120;
const MAX_MEMORY_SAMPLES = 60;
const MAX_EVENTS = 80;

const renderSamplesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const clampSamples = (state) => {
  if (state.ids.length <= state.maxRenderSamples) return;

  renderSamplesAdapter.removeMany(
    state,
    state.ids.slice(state.maxRenderSamples)
  );
};

const pushLimited = (items, item, limit) => {
  items.unshift(item);
  if (items.length > limit) items.length = limit;
};

const initialState = renderSamplesAdapter.getInitialState({
  enabled: true,
  panelOpen: false,
  maxRenderSamples: MAX_RENDER_SAMPLES,
  memorySamples: [],
  webMetrics: {},
  events: [],
  renderSequence: 0,
  lastUpdatedAt: null,
});

export const reactMetricsSlice = createSlice({
  name: "reactMetrics",
  initialState,
  reducers: {
    clearReactMetrics: (state) => {
      renderSamplesAdapter.removeAll(state);
      state.memorySamples = [];
      state.webMetrics = {};
      state.events = [];
      state.renderSequence = 0;
      state.lastUpdatedAt = Date.now();
    },
    recordMemorySample: (state, action) => {
      pushLimited(state.memorySamples, action.payload, MAX_MEMORY_SAMPLES);
      state.lastUpdatedAt = action.payload.timestamp;
    },
    recordReactRender: (state, action) => {
      state.renderSequence += 1;
      renderSamplesAdapter.addOne(state, {
        id: state.renderSequence,
        ...action.payload,
      });
      clampSamples(state);
      state.lastUpdatedAt = action.payload.timestamp;
    },
    recordWebMetric: (state, action) => {
      const metric = action.payload;
      state.webMetrics[metric.name] = metric;
      pushLimited(state.events, metric, MAX_EVENTS);
      state.lastUpdatedAt = metric.timestamp;
    },
    setReactMetricsEnabled: (state, action) => {
      state.enabled = action.payload;
    },
    toggleReactMetricsPanel: (state) => {
      state.panelOpen = !state.panelOpen;
    },
  },
});

export const {
  clearReactMetrics,
  recordMemorySample,
  recordReactRender,
  recordWebMetric,
  setReactMetricsEnabled,
  toggleReactMetricsPanel,
} = reactMetricsSlice.actions;

const renderSelectors = renderSamplesAdapter.getSelectors(
  (state) => state.reactMetrics
);

export const selectReactMetricsState = (state) => state.reactMetrics;
export const selectRenderSamples = renderSelectors.selectAll;
export const selectLatestMemorySample = (state) =>
  state.reactMetrics.memorySamples[0] ?? null;
export const selectWebMetrics = (state) => state.reactMetrics.webMetrics;

export const selectReactMetricsSummary = createSelector(
  [selectRenderSamples, selectLatestMemorySample, selectWebMetrics],
  (renderSamples, latestMemorySample, webMetrics) => {
    const renderCount = renderSamples.length;
    const totalDuration = renderSamples.reduce(
      (sum, sample) => sum + sample.actualDuration,
      0
    );
    const slowestRender = renderSamples.reduce(
      (slowest, sample) =>
        !slowest || sample.actualDuration > slowest.actualDuration
          ? sample
          : slowest,
      null
    );

    return {
      averageRenderDuration:
        renderCount > 0 ? Number((totalDuration / renderCount).toFixed(2)) : 0,
      latestMemorySample,
      renderCount,
      slowestRender,
      webMetrics,
    };
  }
);

export default reactMetricsSlice.reducer;
