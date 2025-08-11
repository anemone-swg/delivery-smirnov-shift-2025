import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { PaymentBlock } from "@/modules/PaymentBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectDeliveryData } from "@/modules/DeliveryBlock";

const CheckoutPaymentPage = () => {
  const deliveryData = useAppSelector(selectDeliveryData);
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
