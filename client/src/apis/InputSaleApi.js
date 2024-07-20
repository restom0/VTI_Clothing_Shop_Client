import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL } from "../configs/Api";

export const InputSaleApi = createApi({
  reducerPath: "InputSaleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_LOCAL_URL + api_routes.input_sales,
  }),
  tagTypes: ["InputSale"],
  endpoints: (builder) => ({
    getInputSales: builder.query({
      query: () => "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["InputSale"],
    }),
    getInputSale: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "InputSale", id }],
    }),
    createInputSale: builder.mutation({
      query: ({ product_id, quantity }) => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["InputSale"],
    }),
    updateInputSale: builder.mutation({
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["InputSale"],
    }),
    deleteInputSale: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["InputSale"],
    }),
  }),
});
export const {
  useGetInputSalesQuery,
  useGetInputSaleQuery,
  useCreateInputSaleMutation,
  useUpdateInputSaleMutation,
  useDeleteInputSaleMutation,
} = InputSaleApi;
