import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: createBaseQueryWithDummyFallback("product", {
    baseUrl: SHOP_URL + api_routes.products,
  }),
  tagTypes: ["Product"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets products. */
    getProducts: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Product"],
    }),
    /** Gets product. */
    getProduct: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    /** Creates product. */
    createProduct: builder.mutation({
      /** Handles query. */
      query: ({ name, short_description, brand_id, category_id }) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
        },
        body: { name, short_description, brand_id, category_id },
      }),
      invalidatesTags: ["Product"],
    }),
    /** Updates product. */
    updateProduct: builder.mutation({
      /** Handles query. */
      query: ({ id, name, short_description, brand_id, category_id }) => ({
        url: `${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
        },
        body: { name, short_description, brand_id, category_id },
      }),
      invalidatesTags: ["Product"],
    }),
    /** Deletes product. */
    deleteProduct: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
      },
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;
