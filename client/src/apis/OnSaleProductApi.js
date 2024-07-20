import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_LOCAL_URL } from "../configs/Api";

export const onSaleProductApi = createApi({
  reducerPath: "onSaleProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_LOCAL_URL }),
  tagTypes: ["onSaleProduct"],
  endpoints: (builder) => ({
    getOnSaleProducts: builder.query({
      query: () => "on-sale-product/",
      providesTags: ["onSaleProduct"],
    }),
    getOnSaleProduct: builder.query({
      query: (id) => `on-sale-product/` + id,
      providesTags: (result, error, id) => [{ type: "onSaleProduct", id }],
    }),
  }),
});

export const { useGetOnSaleProductQuery, useGetOnSaleProductsQuery } =
  onSaleProductApi;
