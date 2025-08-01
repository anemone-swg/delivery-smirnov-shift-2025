import type { AppState } from "@/store/store";

export const selectSenderData = (state: AppState) => state.senderBlock;
