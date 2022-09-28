import { createSlice } from "@reduxjs/toolkit";

import darkTheme from "../constants/theme/dark";
import lightTheme from "../constants/theme/light";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    activeTheme: lightTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      return {
        activeTheme:
          state.activeTheme.type === "light" ? darkTheme : lightTheme,
      };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
