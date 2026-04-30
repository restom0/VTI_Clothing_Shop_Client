import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL + api_routes.orders,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Order", "OrderItem"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "",
      providesTags: ["Order"],
    }),
    getOrdersByUser: builder.query({
      query: () => "user",
      providesTags: ["Order"],
    }),
    getCart: builder.query({
      query: () => "cart",
      providesTags: ["OrderItem"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersByUserQuery,
  useGetCartQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = OrderApi;
