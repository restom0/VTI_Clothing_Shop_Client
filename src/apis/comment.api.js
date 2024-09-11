import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_routes, SHOP_LOCAL_URL, SHOP_URL } from "../configs/api.config";

export const commentApi = createApi({
  reducerPath: "CommentApi",
  baseQuery: fetchBaseQuery({ baseUrl: SHOP_URL + api_routes.comments }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "",
      providesTags: ["Comment"],
    }),
    getComment: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Comment", id }],
      createComment: builder.mutation({
        query: ({ product_id, content }) => ({
          url: "",
          method: "POST",
          body: { product_id, content },
        }),
        invalidatesTags: ["Comment"],
      }),
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
