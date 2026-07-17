import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const InputSaleApi = createApi({
  reducerPath: "InputSaleApi",
  baseQuery: createBaseQueryWithDummyFallback("inputSale", {
    baseUrl: SHOP_URL + api_routes.input_sales,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["InputSale"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets input sales. */
    getInputSales: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["InputSale"],
    }),
    /** Gets input sale. */
    getInputSale: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "InputSale", id }],
    }),
    /** Creates input sale. */
    createInputSale: builder.mutation({
      /** Handles query. */
      query: ({ filter, filter_id, salePercentage, discount, available_date, end_date }) => ({
        url: "",
        method: "POST",
        body: { filter, filter_id, salePercentage, discount, available_date, end_date },
      }),
      invalidatesTags: ["InputSale"],
    }),
    /** Updates input sale. */
    updateInputSale: builder.mutation({
      /** Handles query. */
      query: ({ id, salePercentage, discount, available_date, end_date }) => ({
        url: `${id}`,
        method: "PUT",
        body: { salePercentage, discount, available_date, end_date },
      }),
      invalidatesTags: ["InputSale"],
    }),
    /** Deletes input sale. */
    deleteInputSale: builder.mutation({
      /** Handles query. */
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
