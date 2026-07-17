import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const OrderItemApi = createApi({
  reducerPath: "OrderItemApi",
  baseQuery: createBaseQueryWithDummyFallback("orderItem", {
    baseUrl: SHOP_URL + api_routes.order_items,
  }),
  tagTypes: ["OrderItem"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets order items. */
    getOrderItems: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["OrderItem"],
    }),
    /** Gets order items by order. */
    getOrderItemsByOrder: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "OrderItem", id }],
    }),
    /** Gets order item by order. */
    getOrderItemByOrder: builder.query({
      /** Handles query. */
      query: (orderId, id) => `${orderId}/${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, orderId, id) => [{ type: "OrderItem", id }],
    }),
    /** Creates order item. */
    createOrderItem: builder.mutation({
      /** Handles query. */
      query: ({ order_id, product_id, quantity }) => ({
        url: "",
        method: "POST",
        body: { order_id, product_id, quantity },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`,
        },
      }),
      invalidatesTags: ["OrderItem"],
    }),
    /** Updates order item. */
    updateOrderItem: builder.mutation({
      /** Handles query. */
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["OrderItem"],
    }),
    /** Deletes order item. */
    deleteOrderItem: builder.mutation({
      /** Handles query. */
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
