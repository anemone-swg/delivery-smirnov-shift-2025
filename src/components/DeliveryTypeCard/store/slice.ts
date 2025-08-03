import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DeliveryOption } from "@/types/delivery";
import { Nullable } from "@/types/utils";

type DeliveryTypeCardState = Nullable<DeliveryOption>;

const initialState: DeliveryTypeCardState = {
  id: null,
  price: null,
  days: null,
  name: null,
  type: null,
};

export const deliveryTypeCardSlice = createSlice({
  name: "deliveryTypeCard",
  initialState,
  reducers: {
    setSelectedOption(_state, action: PayloadAction<DeliveryTypeCardState>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: deliveryTypeCardActions } = deliveryTypeCardSlice;
export const { reducer: deliveryTypeCardReducer } = deliveryTypeCardSlice;
