import type { AppState } from "@/store/store";

export const selectSelectedOption = (state: AppState) => state.deliveryTypeCard;
