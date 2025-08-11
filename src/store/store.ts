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
import { receptionBlockReducer } from "@/modules/ReceptionBlock";
import { deliveryBlockReducer } from "@/modules/DeliveryBlock";
import { paymentBlockReducer } from "@/modules/PaymentBlock";
import { verificationBlockReducer } from "@/modules/VerificationBlock";
import { baseApi } from "@/api/rtkApi";

const rootReducer = combineReducers({
  mainDeliveryForm: mainDeliveryFormReducer,
  deliveryTypeCard: deliveryTypeCardReducer,
  recipientBlock: recipientBlockReducer,
  senderBlock: senderBlockReducer,
  receptionBlock: receptionBlockReducer,
  deliveryBlock: deliveryBlockReducer,
  paymentBlock: paymentBlockReducer,
  verificationBlock: verificationBlockReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [baseApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
