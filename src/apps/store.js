import { autoBatchEnhancer, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import activeReducer from "../features/slices/active.slice";
import sidebar_itemReducer from "../features/slices/sidebar_item.slice";
import openAccordionReducer from "../features/slices/open_accordion.slice";
import filterReducer from "../features/slices/filter.slice";
import brandReducer from "../features/slices/brand.slice";
import selectedIdReducer from "../features/slices/select_id.slice";
import sortReducer from "../features/slices/sort.slice";
import nameReducer from "../features/slices/name.slice";
import descriptionReducer from "../features/slices/description.slice";
import categoryReducer from "../features/slices/category.slice";
import avatar_urlReducer from "../features/slices/avatar_url.slice";
import slidersReducer from "../features/slices/sliders.slice";
import productReducer from "../features/slices/product.slice";
import importedProductReducer from "../features/slices/import_product.slice";
import reactMetricsReducer from "../features/slices/react_metrics.slice";
import { reduxPerformanceListener } from "./reduxPerformance.middleware";

import { brandApi } from "../apis/brand.api";
import { categoryApi } from "../apis/category.api";
import { userApi } from "../apis/user.api";
import { importedProductApi } from "../apis/import_product.api";
import { accountApi } from "../apis/account.api";
import { voucherApi } from "../apis/voucher.api";
import { chatApi } from "../apis/chat.api";
import { commentApi } from "../apis/comment.api";
import { InputSaleApi } from "../apis/input_on_sale.api";
import { onSaleProductApi } from "../apis/on_sale_product.api";
import { OrderApi } from "../apis/order.api";
import { OrderItemApi } from "../apis/order_item.api";
import { ProductApi } from "../apis/product.api";
import { logApi } from "../apis/log.api";
import { StatApi } from "../apis/statistic.api";

const rtkQueryApis = [
  brandApi,
  categoryApi,
  userApi,
  importedProductApi,
  accountApi,
  voucherApi,
  chatApi,
  commentApi,
  InputSaleApi,
  onSaleProductApi,
  OrderApi,
  OrderItemApi,
  ProductApi,
  logApi,
  StatApi,
];

export const store = configureStore({
  reducer: {
    // UI State
    active: activeReducer,
    sidebar_item: sidebar_itemReducer,
    openAccordion: openAccordionReducer,
    selectedId: selectedIdReducer,
    sort: sortReducer,
    filter: filterReducer,
    // Form State
    name: nameReducer,
    description: descriptionReducer,
    // Entity State
    brand: brandReducer,
    category: categoryReducer,
    product: productReducer,
    importedProduct: importedProductReducer,
    // Media State
    avatar_url: avatar_urlReducer,
    sliders: slidersReducer,
    // Observability State
    reactMetrics: reactMetricsReducer,
    // RTK Query API reducers
    ...Object.fromEntries(rtkQueryApis.map((api) => [api.reducerPath, api.reducer])),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["reactMetrics.memorySamples", "reactMetrics.events"],
      },
    })
      .prepend(reduxPerformanceListener.middleware)
      .concat(rtkQueryApis.map((api) => api.middleware)),
  devTools: import.meta.env.DEV
    ? {
        trace: true,
        traceLimit: 25,
      }
    : false,
  duplicateMiddlewareCheck: true,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({ autoBatch: false }).concat(autoBatchEnhancer({ type: "raf" })),
});

setupListeners(store.dispatch);
