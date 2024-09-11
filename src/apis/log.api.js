import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL + api_routes.log,
  }),
  tagTypes: ["log"],
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Log"],
    }),
  }),
});

export const { useGetLogsQuery } = logApi;
