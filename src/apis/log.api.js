import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL + api_routes.log,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Log"],
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => "",
      providesTags: ["Log"],
    }),
  }),
});

export const { useGetLogsQuery } = logApi;
