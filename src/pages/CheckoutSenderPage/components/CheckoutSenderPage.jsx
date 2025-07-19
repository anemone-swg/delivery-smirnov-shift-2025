import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { SenderBlock } from "@/modules/SenderBlock";

const CheckoutSenderPage = () => {
  const { recipientData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipientData?.lastName) {
      navigate(PATHS.CHECKOUT_RECIPIENT);
    }
  }, [recipientData]);

  return (
    <>
      <Navbar />
      <SenderBlock />
    </>
  );
};

export default CheckoutSenderPage;
