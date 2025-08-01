import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DeliveryOptions, Package, Point } from "@/types/delivery";

interface MainDeliveryFormState {
  packageType: Package | null;
  fromCity: Point | null;
  toCity: Point | null;
  deliveryForm: DeliveryOptions | undefined;
}

const initialState: MainDeliveryFormState = {
  packageType: null,
  fromCity: null,
  toCity: null,
  deliveryForm: undefined,
};

export const mainDeliveryFormSlice = createSlice({
  name: "mainDeliveryForm",
  initialState,
  reducers: {
    setPackageType(state, action: PayloadAction<Package>) {
      state.packageType = action.payload;
    },
    setFromCity(state, action: PayloadAction<Point>) {
      state.fromCity = action.payload;
    },
    setToCity(state, action: PayloadAction<Point>) {
      state.toCity = action.payload;
    },
    setDeliveryForm(state, action: PayloadAction<DeliveryOptions | undefined>) {
      state.deliveryForm = action.payload;
    },
  },
});

export const { actions: mainDeliveryFormActions } = mainDeliveryFormSlice;
export const { reducer: mainDeliveryFormReducer } = mainDeliveryFormSlice;
