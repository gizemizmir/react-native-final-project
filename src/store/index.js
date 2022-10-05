import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
  },
});
