import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
  name: "stories",
  initialState: {
    storyItems: [],
  },
  reducers: {
    setStories: (state, action) => {
      const { stories } = action.payload;
      return {
        storyItems: stories,
      };
    },
  },
});

export const { setStories } = storySlice.actions;
