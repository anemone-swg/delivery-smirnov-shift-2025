import type { AppState } from "@/store/store";

export const selectPaymentData = (state: AppState) => state.paymentBlock;
