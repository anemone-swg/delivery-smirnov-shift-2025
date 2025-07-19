import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { VerificationBlock } from "@/modules/VerificationBlock";
import PATHS from "@/constants/paths.js";

const CheckoutDataVerificationPage = () => {
  const { paymentData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentData?.isCompleted === false) {
      navigate(PATHS.CHECKOUT_PAYMENT);
    }
  }, [paymentData]);

  if (!paymentData || paymentData.isCompleted === false) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Navbar />
      <VerificationBlock />
    </>
  );
};

export default CheckoutDataVerificationPage;
