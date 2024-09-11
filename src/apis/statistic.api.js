import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_URL } from "../configs/api.config";

export const StatApi = createApi({
  reducerPath: "StatApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL }),
  tagTypes: ["Stat"],
  endpoints: (builder) => ({
    getStat: builder.query({
      query: () => "stat/analysis",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Stat"],
    }),
  }),
});

export const { useGetStatQuery } = StatApi;
