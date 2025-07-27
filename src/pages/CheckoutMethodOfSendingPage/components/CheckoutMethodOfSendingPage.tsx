import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { MethodOfSendingBlock } from "@/modules/MethodOfSendingBlock";
import PATHS from "@/constants/paths";
import { useDelivery } from "@/context/DeliveryContext";
import { useMediaQuery } from "react-responsive";

const CheckoutMethodOfSendingPage = () => {
  const { deliveryForm } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!deliveryForm) {
      navigate(PATHS.MAIN);
    }
  }, [deliveryForm]);

  return (
    <>
      {!isMobile && <Navbar />}
      <MethodOfSendingBlock />
    </>
  );
};

export default CheckoutMethodOfSendingPage;
