import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contactItems: [],
  },
  reducers: {
    setContacts: (state, action) => {
      const { contacts } = action.payload;
      return {
        contactItems: contacts,
      };
    },
  },
});

export const { setContacts } = contactSlice.actions;
