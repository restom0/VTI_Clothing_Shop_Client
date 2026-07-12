import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: createBaseQueryWithDummyFallback("voucher", {
    baseUrl: SHOP_URL + api_routes.vouchers,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVouchers: builder.query({
      query: () => "",
      providesTags: ["Voucher"],
    }),
    getVoucher: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),
    getVoucherByCode: builder.query({
      query: (code) => `code/${code}`,
      providesTags: (result, error, code) => [{ type: "Voucher", code }],
    }),
    getAvailableVouchers: builder.query({
      query: () => "available",
      providesTags: ["Voucher"],
    }),
    addVoucher: builder.mutation({
      query: ({ code, input_stock, value, available_date, expired_date }) => ({
        url: "",
        method: "POST",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    updateVoucher: builder.mutation({
      query: ({ id, code, input_stock, value, available_date, expired_date }) => ({
        url: `${id}`,
        method: "PUT",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    deleteVoucher: builder.mutation({
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
