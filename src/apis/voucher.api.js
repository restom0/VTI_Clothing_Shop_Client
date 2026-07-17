import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: createBaseQueryWithDummyFallback("voucher", {
    baseUrl: SHOP_URL + api_routes.vouchers,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Voucher"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets vouchers. */
    getVouchers: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Voucher"],
    }),
    /** Gets voucher. */
    getVoucher: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),
    /** Gets voucher by code. */
    getVoucherByCode: builder.query({
      /** Handles query. */
      query: (code) => `code/${code}`,
      /** Handles provides tags. */
      providesTags: (result, error, code) => [{ type: "Voucher", code }],
    }),
    /** Gets available vouchers. */
    getAvailableVouchers: builder.query({
      /** Handles query. */
      query: () => "available",
      providesTags: ["Voucher"],
    }),
    /** Adds voucher. */
    addVoucher: builder.mutation({
      /** Handles query. */
      query: ({ code, input_stock, value, available_date, expired_date }) => ({
        url: "",
        method: "POST",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    /** Updates voucher. */
    updateVoucher: builder.mutation({
      /** Handles query. */
      query: ({ id, code, input_stock, value, available_date, expired_date }) => ({
        url: `${id}`,
        method: "PUT",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    /** Deletes voucher. */
    deleteVoucher: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherQuery,
  useGetVoucherByCodeQuery,
  useGetAvailableVouchersQuery,
  useAddVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
} = voucherApi;
