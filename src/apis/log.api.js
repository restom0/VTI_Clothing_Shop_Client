import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: createBaseQueryWithDummyFallback("log", {
    baseUrl: SHOP_URL + api_routes.log,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
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
