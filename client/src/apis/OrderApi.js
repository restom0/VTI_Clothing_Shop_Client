import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.orders }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Order"],
    }),
    getOrdersByUser: builder.query({
      query: () => `user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Order"],
    }),
    getCart: builder.query({
      query: () => ({
        url: `cart`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
