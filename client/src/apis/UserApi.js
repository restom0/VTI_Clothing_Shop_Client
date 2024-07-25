import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.users }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
