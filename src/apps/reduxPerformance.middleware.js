import { createListenerMiddleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { recordWebMetric } from "../features/slices/react_metrics.slice";

export const reduxPerformanceListener = createListenerMiddleware();

reduxPerformanceListener.startListening({
  matcher: isRejectedWithValue,
  /** Handles effect. */
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      recordWebMetric({
        name: "rtk-query-error",
        route: action.meta?.arg?.endpointName ?? "unknown",
        timestamp: Date.now(),
        value: 1,
      })
    );
  },
});
