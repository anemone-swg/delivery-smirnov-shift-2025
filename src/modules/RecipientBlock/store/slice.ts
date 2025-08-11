import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Person } from "@/types/delivery";

type RecipientBlockState = Person;

const initialState: RecipientBlockState = {
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
};

export const recipientBlockSlice = createSlice({
  name: "recipientBlock",
  initialState,
  reducers: {
    setRecipientData(_state, action: PayloadAction<RecipientBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: recipientBlockActions } = recipientBlockSlice;
export const { reducer: recipientBlockReducer } = recipientBlockSlice;
