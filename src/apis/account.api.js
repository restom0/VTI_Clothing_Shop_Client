import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOP_URL, api_routes } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const accountApi = createApi({
  reducerPath: "AccountApi",
  baseQuery: createBaseQueryWithDummyFallback("account", {
    baseUrl: SHOP_URL + api_routes.users,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Account"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Logs in value. */
    login: builder.mutation({
      /** Handles query. */
      query: ({ email, username, phoneNumber, password }) => ({
        url: "login",
        method: "POST",
        body: { email, username, phoneNumber, password },
      }),
      invalidatesTags: ["Account"],
    }),
    /** Registers value. */
    register: builder.mutation({
      /** Handles query. */
      query: ({
        name,
        username,
        password,
        phone_number,
        email,
        birthday,
        avatar_url,
        public_id_avatar_url,
        address,
        gender,
      }) => ({
        url: "register",
        method: "POST",
        body: {
          name,
          username,
          password,
          phone_number,
          email,
          birthday,
          avatar_url,
          public_id_avatar_url,
          address,
          gender,
        },
      }),
      invalidatesTags: ["Account"],
    }),
    /** Gets account. */
    getAccount: builder.query({
      /** Handles query. */
      query: () => "profile",
      providesTags: ["Account"],
    }),
    /** Updates account. */
    updateAccount: builder.mutation({
      /** Handles query. */
      query: ({ email, username, phoneNumber, password }) => ({
        url: "",
        method: "PUT",
        body: { email, username, phoneNumber, password },
      }),
      invalidatesTags: ["Account"],
    }),
    /** Updates password. */
    updatePassword: builder.mutation({
      /** Handles query. */
      query: ({ oldPassword, newPassword }) => ({
        url: "password",
        method: "PUT",
        body: { oldPassword, newPassword },
      }),
      invalidatesTags: ["Account"],
    }),
    /** Deletes account. */
    deleteAccount: builder.mutation({
      /** Handles query. */
      query: () => ({
        url: "",
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
