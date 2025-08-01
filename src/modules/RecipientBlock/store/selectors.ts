import type { AppState } from "@/store/store";

export const selectRecipientData = (state: AppState) => state.recipientBlock;
