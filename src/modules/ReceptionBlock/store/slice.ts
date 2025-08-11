import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Address } from "@/types/delivery";

type ReceptionBlockState = Address;

const initialState: ReceptionBlockState = {
  street: "",
  house: "",
  apartment: "",
  comment: "",
};

export const receptionBlockSlice = createSlice({
  name: "ReceptionBlock",
  initialState,
  reducers: {
    setReceptionData(_state, action: PayloadAction<ReceptionBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: receptionBlockActions } = receptionBlockSlice;
export const { reducer: receptionBlockReducer } = receptionBlockSlice;
