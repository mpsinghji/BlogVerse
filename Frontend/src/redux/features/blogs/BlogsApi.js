import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BlogApi = createApi({
  reducerPath: "BlogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query:(params) =>({
        url: `/blogs`,
        params: {
          search: params?.search || "",
          category: params?.category || "",
          location: params?.location || "",
        }
      }),providesTags : ["Blogs"],
    }),
    fetchBlogById : builder.query({ 
      query: (id) => `/blogs/${id}`,
    }),
    fetchRelatedBlogs: builder.query({
      query: (id) => `blogs/related/${id}`,
    }),
    postBlog : builder.mutation({
      query: (newBlog) => ({
        url: `/blogs/create-post`,
        method: "POST",
        body: newBlog,
        credentials: "include",
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blogs/update-post/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
  }),
});

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = BlogApi;
