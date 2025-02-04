import { configureStore } from "@reduxjs/toolkit";
import { BlogApi } from "./features/blogs/BlogsApi";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import commentApi from "./features/comments/commentApi";

export const store = configureStore({
  reducer: {
    [BlogApi.reducerPath]: BlogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(BlogApi.middleware)
      .concat(authApi.middleware)
      .concat(commentApi.middleware),
});
