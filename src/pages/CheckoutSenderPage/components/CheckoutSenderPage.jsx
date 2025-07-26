import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.ts";
import { Navbar } from "@/modules/Navbar";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { SenderBlock } from "@/modules/SenderBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutSenderPage = () => {
  const { recipientData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!recipientData?.lastName) {
      navigate(PATHS.CHECKOUT_RECIPIENT);
    }
  }, [recipientData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <SenderBlock />
    </>
  );
};

export default CheckoutSenderPage;
