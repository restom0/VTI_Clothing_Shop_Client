import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";

export const onSaleProductApi = createApi({
  reducerPath: "onSaleProductApi",
  baseQuery: createBaseQueryWithDummyFallback("onSaleProduct", {
    baseUrl: SHOP_URL + api_routes.on_sale_products,
  }),
  tagTypes: ["onSaleProduct"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets on sale products. */
    getOnSaleProducts: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["onSaleProduct"],
    }),
    /** Gets on sale product. */
    getOnSaleProduct: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "onSaleProduct", id }],
    }),
  }),
});

export const { useGetOnSaleProductQuery, useGetOnSaleProductsQuery } = onSaleProductApi;
