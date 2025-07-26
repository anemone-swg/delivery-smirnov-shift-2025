import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { VerificationBlock } from "@/modules/VerificationBlock";
import PATHS from "@/constants/paths.ts";
import { useMediaQuery } from "react-responsive";

const CheckoutDataVerificationPage = () => {
  const { paymentData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
      {!isMobile && <Navbar />}
      <VerificationBlock />
    </>
  );
};

export default CheckoutDataVerificationPage;
