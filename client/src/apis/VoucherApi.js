import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL } from "../configs/Api";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_LOCAL_URL + api_routes.vouchers }),
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
      query: ({ code, discount, description }) => ({
        url: ``,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { code, discount, description },
      }),
      invalidatesTags: ["Voucher"],
    }),
    updateVoucher: builder.mutation({
      query: ({ id, code, discount, description }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { code, discount, description },
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
