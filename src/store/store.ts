import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { mainDeliveryFormReducer } from "@/modules/MainDeliveryForm";
import { deliveryTypeCardReducer } from "@/components/DeliveryTypeCard";
import { recipientBlockReducer } from "@/modules/RecipientBlock";
import { senderBlockReducer } from "@/modules/SenderBlock";

const rootReducer = combineReducers({
  mainDeliveryForm: mainDeliveryFormReducer,
  deliveryTypeCard: deliveryTypeCardReducer,
  recipientBlock: recipientBlockReducer,
  senderBlock: senderBlockReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
