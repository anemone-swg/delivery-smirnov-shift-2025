import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof import("./store").store>();
export const createAppSelector = createSelector.withTypes<AppState>();
