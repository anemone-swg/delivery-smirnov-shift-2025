import type { AppState } from "@/store/store";

export const selectReceptionData = (state: AppState) => state.receptionBlock;
