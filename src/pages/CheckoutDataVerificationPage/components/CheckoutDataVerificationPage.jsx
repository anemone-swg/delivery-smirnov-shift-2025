import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { VerificationBlock } from "@/modules/VerificationBlock";

const CheckoutDataVerificationPage = () => {
  const { deliveryData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryData.street) {
      navigate(PATHS.CHECKOUT_PAYMENT);
    }
  }, [deliveryData]);

  return (
    <>
      <Navbar />
      <VerificationBlock />
    </>
  );
};

export default CheckoutDataVerificationPage;
