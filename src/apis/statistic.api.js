import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_URL } from "../configs/api.config";

export const StatApi = createApi({
  reducerPath: "StatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Stat"],
  endpoints: (builder) => ({
    getStat: builder.query({
      query: () => "stat/analysis",
      providesTags: ["Stat"],
    }),
  }),
});

export const { useGetStatQuery } = StatApi;
