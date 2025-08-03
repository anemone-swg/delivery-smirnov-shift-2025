import { createAsyncThunk } from "@reduxjs/toolkit";
import { deliveryBlockActions } from "@/modules/DeliveryBlock";
import { deliveryTypeCardActions } from "@/components/DeliveryTypeCard";
import { paymentBlockActions } from "@/modules/PaymentBlock";
import { mainDeliveryFormActions } from "@/modules/MainDeliveryForm";
import { senderBlockActions } from "@/modules/SenderBlock";
import { receptionBlockActions } from "@/modules/ReceptionBlock";
import { recipientBlockActions } from "@/modules/RecipientBlock";
import { verificationBlockActions } from "@/modules/VerificationBlock";

export const resetDeliveryData = createAsyncThunk(
  "app/resetAllData",
  async (_, { dispatch }) => {
    dispatch(deliveryBlockActions.reset());
    dispatch(paymentBlockActions.reset());
    dispatch(deliveryTypeCardActions.reset());
    dispatch(mainDeliveryFormActions.reset());
    dispatch(senderBlockActions.reset());
    dispatch(receptionBlockActions.reset());
    dispatch(recipientBlockActions.reset());
    dispatch(verificationBlockActions.reset());
  },
);
