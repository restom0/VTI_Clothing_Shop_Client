import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const importedProductApi = createApi({
  reducerPath: "importedProductApi",
  baseQuery: createBaseQueryWithDummyFallback("importedProduct", {
    baseUrl: SHOP_URL + api_routes.imported_products,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["ImportedProduct"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets imported products. */
    getImportedProducts: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["ImportedProduct"],
    }),
    /** Gets imported product. */
    getImportedProduct: builder.query({
      /** Handles query. */
      query: ({ filter, id }) => `${filter}/${id || 0}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "ImportedProduct", id }],
    }),
    /** Adds imported product. */
    addImportedProduct: builder.mutation({
      /** Handles query. */
      query: ({
        product_id,
        color_code,
        color_name,
        size,
        height,
        weight,
        material,
        gender,
        importPrice,
        image_url,
        slider_url_1,
        slider_url_2,
        slider_url_3,
        slider_url_4,
        public_id_url,
        public_id_slider_url_1,
        public_id_slider_url_2,
        public_id_slider_url_3,
        public_id_slider_url_4,
        importNumber,
      }) => ({
        url: "",
        method: "POST",
        body: {
          product_id,
          color_code,
          color_name,
          size,
          height,
          weight,
          material,
          gender,
          importPrice,
          image_url,
          slider_url_1,
          slider_url_2,
          slider_url_3,
          slider_url_4,
          public_id_url,
          public_id_slider_url_1,
          public_id_slider_url_2,
          public_id_slider_url_3,
          public_id_slider_url_4,
          importNumber,
        },
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
    /** Updates imported product. */
    updateImportedProduct: builder.mutation({
      /** Handles query. */
      query: ({
        id,
        product_id,
        color_code,
        color_name,
        size,
        height,
        weight,
        material,
        gender,
        importPrice,
        image_url,
        slider_url_1,
        slider_url_2,
        slider_url_3,
        slider_url_4,
        public_id_url,
        public_id_slider_url_1,
        public_id_slider_url_2,
        public_id_slider_url_3,
        public_id_slider_url_4,
        importNumber,
        color_id,
        size_id,
        material_id,
      }) => ({
        url: `${id}`,
        method: "PUT",
        body: {
          product_id,
          color_code,
          color_name,
          size,
          height,
          weight,
          material,
          gender,
          importPrice,
          image_url,
          slider_url_1,
          slider_url_2,
          slider_url_3,
          slider_url_4,
          public_id_url,
          public_id_slider_url_1,
          public_id_slider_url_2,
          public_id_slider_url_3,
          public_id_slider_url_4,
          importNumber,
          color_id,
          size_id,
          material_id,
        },
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
    /** Deletes imported product. */
    deleteImportedProduct: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
    /** Gets colors. */
    getColors: builder.query({
      /** Handles query. */
      query: () => "/colors",
    }),
    /** Gets sizes. */
    getSizes: builder.query({
      /** Handles query. */
      query: () => "/sizes",
    }),
    /** Gets materials. */
    getMaterials: builder.query({
      /** Handles query. */
      query: () => "/materials",
    }),
  }),
});

export const {
  useGetImportedProductsQuery,
  useGetImportedProductQuery,
  useAddImportedProductMutation,
  useDeleteImportedProductMutation,
  useUpdateImportedProductMutation,
  useGetColorsQuery,
  useGetSizesQuery,
  useGetMaterialsQuery,
} = importedProductApi;
