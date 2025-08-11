import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Person } from "@/types/delivery";

type SenderBlockState = Person;

const initialState: SenderBlockState = {
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
};

export const senderBlockSlice = createSlice({
  name: "senderBlock",
  initialState,
  reducers: {
    setSenderData(_state, action: PayloadAction<SenderBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: senderBlockActions } = senderBlockSlice;
export const { reducer: senderBlockReducer } = senderBlockSlice;
