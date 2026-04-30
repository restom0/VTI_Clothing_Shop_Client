import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";

export const InputSaleApi = createApi({
  reducerPath: "InputSaleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL + api_routes.input_sales,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["InputSale"],
  endpoints: (builder) => ({
    getInputSales: builder.query({
      query: () => "",
      providesTags: ["InputSale"],
    }),
    getInputSale: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "InputSale", id }],
    }),
    createInputSale: builder.mutation({
      query: ({ filter, filter_id, salePercentage, discount, available_date, end_date }) => ({
        url: "",
        method: "POST",
        body: { filter, filter_id, salePercentage, discount, available_date, end_date },
      }),
      invalidatesTags: ["InputSale"],
    }),
    updateInputSale: builder.mutation({
      query: ({ id, salePercentage, discount, available_date, end_date }) => ({
        url: `${id}`,
        method: "PUT",
        body: { salePercentage, discount, available_date, end_date },
      }),
      invalidatesTags: ["InputSale"],
    }),
    deleteInputSale: builder.mutation({
      query: (id) => ({
        url: `${id}`,
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
