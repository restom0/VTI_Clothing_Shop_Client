import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_LOCAL_URL } from "../configs/Api";

export const importedProductApi = createApi({
  reducerPath: "importedProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_LOCAL_URL }),
  tagTypes: ["ImportedProduct"],
  endpoints: (builder) => ({
    getImportedProducts: builder.query({
      query: () => "imported-product/",
      providesTags: ["ImportedProduct"],
    }),
    getImportedProduct: builder.query({
      query: (filter, id) => `imported-product/${filter}/${id}`,
      providesTags: (result, error, id) => [{ type: "ImportedProduct", id }],
    }),
    addImportedProduct: builder.mutation({
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
        imageUrl,
        slider_url_1,
        slider_url_2,
        slider_url_3,
        slider_url_4,
        importNumber,
      }) => ({
        url: `imported-product/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
          imageUrl,
          slider_url_1,
          slider_url_2,
          slider_url_3,
          slider_url_4,
          importNumber,
        },
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
    updateImportedProduct: builder.mutation({
      query: (
        id,
        {
          product_id,
          color_code,
          color_name,
          size,
          height,
          weight,
          material,
          gender,
          importPrice,
          imageUrl,
          slider_url_1,
          slider_url_2,
          slider_url_3,
          slider_url_4,
          importNumber,
        }
      ) => ({
        url: `imported-product/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
          imageUrl,
          slider_url_1,
          slider_url_2,
          slider_url_3,
          slider_url_4,
          importNumber,
        },
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
    deleteImportedProduct: builder.mutation({
      query: (id) => ({
        url: `imported-product/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["ImportedProduct"],
    }),
  }),
});

export const {
  useGetImportedProductsQuery,
  useGetImportedProductQuery,
  useAddImportedProductMutation,
  useDeleteImportedProductMutation,
  useUpdateImportedProductMutation,
} = importedProductApi;
