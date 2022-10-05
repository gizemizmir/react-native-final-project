import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { authSlice } from "./authSlice";
import { contactSlice } from "./contactSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    contacts: contactSlice.reducer,
  },
});
