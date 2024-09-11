import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/api.config";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.vouchers }),
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVouchers: builder.query({
      query: () => "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Voucher"],
    }),
    getVoucher: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Voucher", id }],
    }),
    getVoucherByCode: builder.query({
      query: (code) => `code/` + code,
      providesTags: (result, error, code) => [{ type: "Voucher", code }],
    }),
    getAvailableVouchers: builder.query({
      query: () => "available",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Voucher"],
    }),
    addVoucher: builder.mutation({
      query: ({ code, input_stock, value, available_date, expired_date }) => ({
        url: ``,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    updateVoucher: builder.mutation({
      query: ({
        id,
        code,
        input_stock,
        value,
        available_date,
        expired_date,
      }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { code, input_stock, value, available_date, expired_date },
      }),
      invalidatesTags: ["Voucher"],
    }),
    deleteVoucher: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
