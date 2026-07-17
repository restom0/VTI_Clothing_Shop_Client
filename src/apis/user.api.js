import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQueryWithDummyFallback("user", {
    baseUrl: SHOP_URL + api_routes.users,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets users. */
    getUsers: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Users"],
    }),
    /** Deletes user. */
    deleteUser: builder.mutation({
      /** Handles query. */
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    /** Gets user profile. */
    getUserProfile: builder.query({
      /** Handles query. */
      query: () => "profile",
      providesTags: ["User-Profile"],
    }),
    /** Updates password. */
    updatePassword: builder.mutation({
      /** Handles query. */
      query: (data) => ({
        url: "password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User-Profile"],
    }),
    /** Updates user profile. */
    updateUserProfile: builder.mutation({
      /** Handles query. */
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
