import { configureStore } from "@reduxjs/toolkit";
import { BlogApi } from "./features/blogs/BlogsApi";
import authApi from "./features/auth/authApi";

export const store = configureStore({
    reducer: {
         [BlogApi.reducerPath]: BlogApi.reducer,
         [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(BlogApi.middleware),
});