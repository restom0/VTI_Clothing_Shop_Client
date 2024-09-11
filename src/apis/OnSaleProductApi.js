import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const onSaleProductApi = createApi({
  reducerPath: "onSaleProductApi",
  baseQuery: fetchBaseQuery({
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

export const { useGetOnSaleProductQuery, useGetOnSaleProductsQuery } =
  onSaleProductApi;
