import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: createBaseQueryWithDummyFallback("brand", {
    baseUrl: SHOP_URL + api_routes.brands,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "",
      providesTags: ["Brand"],
    }),
    getBrand: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
    addBrand: builder.mutation({
      query: ({ name, description }) => ({
        url: "",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `${id}`,
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
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
