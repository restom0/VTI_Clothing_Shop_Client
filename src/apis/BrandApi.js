import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.brands }),
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
