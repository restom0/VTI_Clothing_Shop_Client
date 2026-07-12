import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const StatApi = createApi({
  reducerPath: "StatApi",
  baseQuery: createBaseQueryWithDummyFallback("stat", {
    baseUrl: SHOP_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
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
