import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { MethodOfSendingBlock } from "@/modules/MethodOfSendingBlock";
import PATHS from "@/constants/paths.js";
import { useDelivery } from "@/context/DeliveryContext.jsx";

const CheckoutMethodOfSendingPage = () => {
  const { deliveryForm } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryForm) {
      navigate(PATHS.MAIN);
    }
  }, [deliveryForm]);

  return (
    <>
      <Navbar />
      <MethodOfSendingBlock />
    </>
  );
};

export default CheckoutMethodOfSendingPage;
