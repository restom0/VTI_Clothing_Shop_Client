import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: createBaseQueryWithDummyFallback("chat", {
    baseUrl: SHOP_URL + api_routes.chat,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "",
      providesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    createChat: builder.mutation({
      query: ({ receiver_id, message }) => ({
        url: "",
        method: "POST",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    updateChat: builder.mutation({
      query: ({ id, receiver_id, message }) => ({
        url: `${id}`,
        method: "PUT",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    replyChat: builder.mutation({
      query: ({ id, message }) => ({
        url: `reply/${id}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});
export const {
  useGetChatsQuery,
  useGetChatQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
  useUpdateChatMutation,
  useReplyChatMutation,
} = chatApi;
