import type { AppState } from "@/store/store";

export const selectPackageType = (state: AppState) =>
  state.mainDeliveryForm.packageType;

export const selectFromCity = (state: AppState) =>
  state.mainDeliveryForm.fromCity;

export const selectToCity = (state: AppState) => state.mainDeliveryForm.toCity;

export const selectDeliveryForm = (state: AppState) =>
  state.mainDeliveryForm.deliveryForm;
