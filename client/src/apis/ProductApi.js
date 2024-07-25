import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.products }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "",
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation({
      query: ({ name, price, brand_id, category_id }) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { name, price, brand_id, category_id },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, name, price, description, image }) => ({
        url: `${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { name, price, description, image },
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
