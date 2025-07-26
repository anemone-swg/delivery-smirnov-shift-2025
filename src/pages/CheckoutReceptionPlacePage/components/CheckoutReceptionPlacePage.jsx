import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.ts";
import { Navbar } from "@/modules/Navbar";
import { ReceptionBlock } from "@/modules/ReceptionBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutReceptionPlacePage = () => {
  const { senderData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!senderData?.lastName) {
      navigate(PATHS.CHECKOUT_SENDER);
    }
  }, [senderData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <ReceptionBlock />
    </>
  );
};

export default CheckoutReceptionPlacePage;
