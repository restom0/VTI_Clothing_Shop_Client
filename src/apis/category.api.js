import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: createBaseQueryWithDummyFallback("category", {
    baseUrl: SHOP_URL + api_routes.categories,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Category"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets categories. */
    getCategories: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Category"],
    }),
    /** Gets category. */
    getCategory: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    /** Adds category. */
    addCategory: builder.mutation({
      /** Handles query. */
      query: ({ name, description }) => ({
        url: "",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Category"],
    }),
    /** Updates category. */
    updateCategory: builder.mutation({
      /** Handles query. */
      query: ({ id, name, description }) => ({
        url: `${id}`,
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Category"],
    }),
    /** Deletes category. */
    deleteCategory: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
