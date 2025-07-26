import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.ts";
import { Navbar } from "@/modules/Navbar";
import { PaymentBlock } from "@/modules/PaymentBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutPaymentPage = () => {
  const { deliveryData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!deliveryData?.street) {
      navigate(PATHS.CHECKOUT_DELIVERY);
    }
  }, [deliveryData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <PaymentBlock />
    </>
  );
};

export default CheckoutPaymentPage;
