import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReceiverAddress } from "@/types/delivery";

type DeliveryBlockState = ReceiverAddress;

const initialState: DeliveryBlockState = {
  street: "",
  house: "",
  apartment: "",
  comment: "",
  isNonContact: false,
};

export const deliveryBlockSlice = createSlice({
  name: "DeliveryBlock",
  initialState,
  reducers: {
    setDeliveryData(_state, action: PayloadAction<DeliveryBlockState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: deliveryBlockActions } = deliveryBlockSlice;
export const { reducer: deliveryBlockReducer } = deliveryBlockSlice;
