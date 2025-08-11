import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Payment } from "@/types/delivery";

type PaymentBlockState = Payment;

const initialState: PaymentBlockState = {
  value: "SENDER",
  isCompleted: false,
};

export const paymentBlockSlice = createSlice({
  name: "PaymentBlock",
  initialState,
  reducers: {
    setPaymentData(_state, action: PayloadAction<PaymentBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: paymentBlockActions } = paymentBlockSlice;
export const { reducer: paymentBlockReducer } = paymentBlockSlice;
