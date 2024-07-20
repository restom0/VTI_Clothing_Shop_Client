import { configureStore } from "@reduxjs/toolkit";

import activeReducer from "../features/slices/activeSlice";
import sidebar_itemReducer from "../features/slices/sidebar_itemSlice";
import openAccordionReducer from "../features/slices/openAccordion";
import filterReducer from "../features/slices/filterSlice";
import brandReducer from "../features/slices/brandSlice";
import selectedIdReducer from "../features/slices/selectIdPrice";

import { brandApi } from "../apis/BrandApi";
import { categoryApi } from "../apis/CategoryApi";
import { userApi } from "../apis/UserApi";
import { importedProductApi } from "../apis/ImportedProductApi";
import { accountApi } from "../apis/AccountApi";
import { voucherApi } from "../apis/VoucherApi";
import { chatApi } from "../apis/ChatApi";
import { commentApi } from "../apis/CommentApi";
import { InputSaleApi } from "../apis/InputSaleApi";
import { onSaleProductApi } from "../apis/OnSaleProductApi";
import { OrderApi } from "../apis/OrderApi";
import { OrderItemApi } from "../apis/OrderItemApi";
import { ProductApi } from "../apis/ProductApi";

export const store = configureStore({
  reducer: {
    active: activeReducer,
    sidebar_item: sidebar_itemReducer,
    openAccordion: openAccordionReducer,
    filter: filterReducer,
    brand: brandReducer,
    selectedId: selectedIdReducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [importedProductApi.reducerPath]: importedProductApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [InputSaleApi.reducerPath]: InputSaleApi.reducer,
    [onSaleProductApi.reducerPath]: onSaleProductApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [OrderItemApi.reducerPath]: OrderItemApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(brandApi.middleware)
      .concat(categoryApi.middleware)
      .concat(userApi.middleware)
      .concat(importedProductApi.middleware)
      .concat(accountApi.middleware)
      .concat(voucherApi.middleware)
      .concat(chatApi.middleware)
      .concat(commentApi.middleware)
      .concat(InputSaleApi.middleware)
      .concat(onSaleProductApi.middleware)
      .concat(OrderApi.middleware)
      .concat(OrderItemApi.middleware)
      .concat(ProductApi.middleware),
});
