import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { VerificationBlock } from "@/modules/VerificationBlock";
import PATHS from "@/constants/paths";
import { useMediaQuery } from "react-responsive";
import { selectPaymentData } from "@/modules/PaymentBlock";
import { useAppSelector } from "@/store/hooks";

const CheckoutDataVerificationPage = () => {
  const paymentData = useAppSelector(selectPaymentData);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (paymentData?.isCompleted === false) {
      navigate(PATHS.CHECKOUT_PAYMENT);
    }
  }, [paymentData]);

  if (!paymentData || !paymentData.isCompleted) {
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
