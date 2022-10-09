import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chatItems: [],
  },
  reducers: {
    setChats: (state, action) => {
      const { chats } = action.payload;
      return {
        chatItems: chats,
      };
    },
  },
});

export const { setChats } = chatSlice.actions;
