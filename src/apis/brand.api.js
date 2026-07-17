import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: createBaseQueryWithDummyFallback("brand", {
    baseUrl: SHOP_URL + api_routes.brands,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Brand"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets brands. */
    getBrands: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Brand"],
    }),
    /** Gets brand. */
    getBrand: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
    /** Adds brand. */
    addBrand: builder.mutation({
      /** Handles query. */
      query: ({ name, description }) => ({
        url: "",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    /** Updates brand. */
    updateBrand: builder.mutation({
      /** Handles query. */
      query: ({ id, name, description }) => ({
        url: `${id}`,
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    /** Deletes brand. */
    deleteBrand: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandApi;
