import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { MethodOfSendingBlock } from "@/modules/MethodOfSendingBlock";
import PATHS from "@/constants/paths.js";
import { useDelivery } from "@/context/DeliveryContext.jsx";

const CheckoutMethodOfSendingPage = () => {
  const { setDeliveryForm } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!setDeliveryForm) {
      navigate(PATHS.CHECKOUT_METHOD);
    }
  }, [setDeliveryForm]);

  return (
    <>
      <Navbar />
      <MethodOfSendingBlock />
    </>
  );
};

export default CheckoutMethodOfSendingPage;
