import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: createBaseQueryWithDummyFallback("order", {
    baseUrl: SHOP_URL + api_routes.orders,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Order", "OrderItem"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets orders. */
    getOrders: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Order"],
    }),
    /** Gets orders by user. */
    getOrdersByUser: builder.query({
      /** Handles query. */
      query: () => "user",
      providesTags: ["Order"],
    }),
    /** Gets cart. */
    getCart: builder.query({
      /** Handles query. */
      query: () => "cart",
      providesTags: ["OrderItem"],
    }),
    /** Updates order. */
    updateOrder: builder.mutation({
      /** Handles query. */
      query: ({ id, product_id, quantity }) => ({
        url: `${id}`,
        method: "PUT",
        body: { product_id, quantity },
      }),
      invalidatesTags: ["Order"],
    }),
    /** Deletes order. */
    deleteOrder: builder.mutation({
      /** Handles query. */
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
