import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";

export const onSaleProductApi = createApi({
  reducerPath: "onSaleProductApi",
  baseQuery: createBaseQueryWithDummyFallback("onSaleProduct", {
    baseUrl: SHOP_URL + api_routes.on_sale_products,
  }),
  tagTypes: ["onSaleProduct"],
  endpoints: (builder) => ({
    getOnSaleProducts: builder.query({
      query: () => "",
      providesTags: ["onSaleProduct"],
    }),
    getOnSaleProduct: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "onSaleProduct", id }],
    }),
  }),
});

export const { useGetOnSaleProductQuery, useGetOnSaleProductsQuery } = onSaleProductApi;
