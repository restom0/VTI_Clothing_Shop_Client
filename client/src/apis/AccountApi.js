import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_LOCAL_URL, api_routes } from "../configs/Api";

export const accountApi = createApi({
  reducerPath: "AccountApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_LOCAL_URL + api_routes.users }),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, username, phoneNumber, password }) => ({
        url: "login",
        method: "POST",
        body: { email, username, phoneNumber, password },
      }),
      invalidatesTags: ["Account"],
    }),
    register: builder.mutation({
      query: ({
        email,
        username,
        phoneNumber,
        password,
        name,
        address,
        birthday,
        avatar_url,
        gender,
      }) => ({
        url: api_routes.users + " register",
        method: "POST",
        body: {
          email,
          username,
          phoneNumber,
          password,
          name,
          address,
          birthday,
          avatar_url,
          gender,
        },
      }),
      invalidatesTags: ["Account"],
    }),
    getAccount: builder.query({
      query: () => api_routes.users + " profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Account"],
    }),
    updateAccount: builder.mutation({
      query: ({ email, username, phoneNumber, password }) => ({
        url: "",
        method: "PUT",
        body: { email, username, phoneNumber, password },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      invalidatesTags: ["Account"],
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "password",
        method: "PUT",
        body: { oldPassword, newPassword },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      invalidatesTags: ["Account"],
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useUpdatePasswordMutation,
} = accountApi;
