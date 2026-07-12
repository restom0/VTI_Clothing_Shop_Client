import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";

export const commentApi = createApi({
  reducerPath: "CommentApi",
  baseQuery: createBaseQueryWithDummyFallback("comment", {
    baseUrl: SHOP_URL + api_routes.comments,
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "",
      providesTags: ["Comment"],
    }),
    getComment: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Comment", id }],
    }),
    addComment: builder.mutation({
      query: ({ product_id, content, star }) => ({
        url: "",
        method: "POST",
        body: { product_id, content, star },
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `${id}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
