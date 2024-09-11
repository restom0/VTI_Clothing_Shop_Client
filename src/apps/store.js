import { configureStore } from "@reduxjs/toolkit";

import activeReducer from "../features/slices/activeSlice";
import sidebar_itemReducer from "../features/slices/sidebar_itemSlice";
import openAccordionReducer from "../features/slices/openAccordion";
import filterReducer from "../features/slices/filterSlice";
import brandReducer from "../features/slices/brandSlice";
import selectedIdReducer from "../features/slices/selectIdSlice";
import sortReducer from "../features/slices/sortSlice";
import nameReducer from "../features/slices/nameSlice";
import descriptionReducer from "../features/slices/descriptionSlice";
import categoryReducer from "../features/slices/categorySlice";
import avatar_urlReducer from "../features/slices/avatar_urlSlice";
import slider1Reducer from "../features/slices/slider1Slice";
import slider2Reducer from "../features/slices/slider2Slice";
import slider3Reducer from "../features/slices/slider3Slice";
import slider4Reducer from "../features/slices/slider4Slice";
import productReducer from "../features/slices/productSlice";
import importedProductReducer from "../features/slices/importedProductSlice";

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

export const store = configureStore({
  reducer: {
    active: activeReducer,
    sidebar_item: sidebar_itemReducer,
    openAccordion: openAccordionReducer,
    filter: filterReducer,
    brand: brandReducer,
    selectedId: selectedIdReducer,
    sort: sortReducer,
    name: nameReducer,
    description: descriptionReducer,
    category: categoryReducer,
    avatar_url: avatar_urlReducer,
    slider1: slider1Reducer,
    slider2: slider2Reducer,
    slider3: slider3Reducer,
    slider4: slider4Reducer,
    product: productReducer,
    importedProduct: importedProductReducer,

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
    [logApi.reducerPath]: logApi.reducer,
    [StatApi.reducerPath]: StatApi.reducer,
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
      .concat(ProductApi.middleware)
      .concat(logApi.middleware)
      .concat(StatApi.middleware),
});
