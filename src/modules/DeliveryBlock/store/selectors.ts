import type { AppState } from "@/store/store";

export const selectDeliveryData = (state: AppState) => state.deliveryBlock;
