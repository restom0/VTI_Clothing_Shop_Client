import { createApi } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_URL } from "../configs/api.config";
import { createBaseQueryWithDummyFallback } from "./dummyFallback.api";

export const commentApi = createApi({
  reducerPath: "CommentApi",
  baseQuery: createBaseQueryWithDummyFallback("comment", {
    baseUrl: SHOP_URL + api_routes.comments,
  }),
  tagTypes: ["Comment"],
  /** Handles endpoints. */
  endpoints: (builder) => ({
    /** Gets comments. */
    getComments: builder.query({
      /** Handles query. */
      query: () => "",
      providesTags: ["Comment"],
    }),
    /** Gets comment. */
    getComment: builder.query({
      /** Handles query. */
      query: (id) => `${id}`,
      /** Handles provides tags. */
      providesTags: (result, error, id) => [{ type: "Comment", id }],
    }),
    /** Adds comment. */
    addComment: builder.mutation({
      /** Handles query. */
      query: ({ product_id, content, star }) => ({
        url: "",
        method: "POST",
        body: { product_id, content, star },
      }),
      invalidatesTags: ["Comment"],
    }),
    /** Updates comment. */
    updateComment: builder.mutation({
      /** Handles query. */
      query: ({ id, content }) => ({
        url: `${id}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Comment"],
    }),
    /** Deletes comment. */
    deleteComment: builder.mutation({
      /** Handles query. */
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
