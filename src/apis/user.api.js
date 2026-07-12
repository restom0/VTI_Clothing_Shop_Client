import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQueryWithDummyFallback("user", {
    baseUrl: SHOP_URL + api_routes.users,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "",
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: () => "profile",
      providesTags: ["User-Profile"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User-Profile"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User-Profile"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
} = userApi;
