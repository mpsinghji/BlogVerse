import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
      refetchOnMount: true,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role, username }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role, username },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authApi;

export default authApi;
