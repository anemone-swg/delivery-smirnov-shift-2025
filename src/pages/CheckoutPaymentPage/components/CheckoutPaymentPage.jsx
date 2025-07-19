import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { PaymentBlock } from "@/modules/PaymentBlock";

const CheckoutPaymentPage = () => {
  const { deliveryData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryData?.street) {
      navigate(PATHS.CHECKOUT_DELIVERY);
    }
  }, [deliveryData]);

  return (
    <>
      <Navbar />
      <PaymentBlock />
    </>
  );
};

export default CheckoutPaymentPage;
