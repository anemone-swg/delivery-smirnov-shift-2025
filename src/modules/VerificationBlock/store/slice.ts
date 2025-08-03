import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DeliveryOrderRequest } from "@/types/delivery";

type VerificationBlockState = DeliveryOrderRequest;

const initialState: VerificationBlockState = {
  packageId: "",
  optionType: null,
  senderPointId: "",
  senderAddress: {
    street: "",
    house: "",
    apartment: "",
    comment: "",
  },
  sender: {
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
  },
  receiverPointId: "",
  receiverAddress: {
    street: "",
    house: "",
    apartment: "",
    comment: "",
    isNonContact: false,
  },
  receiver: {
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
  },
  payer: "SENDER",
};

export const verificationBlockSlice = createSlice({
  name: "VerificationBlock",
  initialState,
  reducers: {
    setDeliveryOrder(_state, action: PayloadAction<VerificationBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: verificationBlockActions } = verificationBlockSlice;
export const { reducer: verificationBlockReducer } = verificationBlockSlice;
