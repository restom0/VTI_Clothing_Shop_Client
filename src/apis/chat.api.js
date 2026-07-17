import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";
import { STORAGE_KEYS } from "../constants/storage.constant";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: createBaseQueryWithDummyFallback("chat", {
    baseUrl: SHOP_URL + api_routes.chat,
    /** Handles prepare headers. */
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Chat"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets chats. */
    getChats: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Chat"],
    }),
    /** Gets chat. */
    getChat: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    /** Creates chat. */
    createChat: builder.mutation({
      /** Handles query. */
      query: ({ receiver_id, message }) => ({
        url: "",
        method: "POST",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    /** Updates chat. */
    updateChat: builder.mutation({
      /** Handles query. */
      query: ({ id, receiver_id, message }) => ({
        url: `${id}`,
        method: "PUT",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    /** Handles reply chat. */
    replyChat: builder.mutation({
      /** Handles query. */
      query: ({ id, message }) => ({
        url: `reply/${id}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Chat"],
    }),
    /** Deletes chat. */
    deleteChat: builder.mutation({
      /** Handles query. */
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
