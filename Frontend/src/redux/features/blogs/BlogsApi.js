import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BlogApi = createApi({
  reducerPath: "BlogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      // query: (search = "", category = "", location = "") =>
      //   `/blogs?search=${search}&category=${category}&location=${location}`,
      query:(params) =>({
        url: `/blogs`,
        params: {
          search: params?.search || "",
          category: params?.category || "",
          location: params?.location || "",
        }
      })
    }),
    fetchBlogById : builder.query({ 
      query: (id) => `/blogs/${id}`,
    }),
    fetchRelatedBlogs: builder.query({
      query: (id) => `blogs/related/${id}`,
    }),
  }),
});

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery } = BlogApi;
