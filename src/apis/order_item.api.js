import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/api.config";

export const OrderItemApi = createApi({
  reducerPath: "OrderItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL + api_routes.order_items,
  }),
  tagTypes: ["OrderItem"],
  endpoints: (builder) => ({
    getOrderItems: builder.query({
      query: () => "",
      providesTags: ["OrderItem"],
    }),
    getOrderItemsByOrder: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "OrderItem", id }],
    }),
    getOrderItemByOrder: builder.query({
      query: (orderId, id) => `${orderId}/${id}`,
      providesTags: (result, error, orderId, id) => [{ type: "OrderItem", id }],
    }),
    createOrderItem: builder.mutation({
      query: ({ order_id, product_id, quantity }) => ({
        url: "",
        method: "POST",
        body: { order_id, product_id, quantity },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["OrderItem"],
    }),
    updateOrderItem: builder.mutation({
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["OrderItem"],
    }),
    deleteOrderItem: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrderItem"],
    }),
  }),
});

export const {
  useGetOrderItemsQuery,
  useGetOrderItemsByOrderQuery,
  useGetOrderItemByOrderQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
} = OrderItemApi;
