import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { PaymentBlock } from "@/modules/PaymentBlock";

const CheckoutPaymentPage = () => {
  const { setDeliveryData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!setDeliveryData) {
      navigate(PATHS.CHECKOUT_DELIVERY);
    }
  }, [setDeliveryData]);

  return (
    <>
      <Navbar />
      <PaymentBlock />
    </>
  );
};

export default CheckoutPaymentPage;
