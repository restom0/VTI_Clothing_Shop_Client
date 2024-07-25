import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/Api";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.chats }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      providesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    createChat: builder.mutation({
      query: ({ receiver_id, message }) => ({
        url: "",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    updateChat: builder.mutation({
      query: ({ id, receiver_id, message }) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: { receiver_id, message },
      }),
      invalidatesTags: ["Chat"],
    }),
    replyChat: builder.mutation({
      query: ({ id, message }) => ({
        url: `reply/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
