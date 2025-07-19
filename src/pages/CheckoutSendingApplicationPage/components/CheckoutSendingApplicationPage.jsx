import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { ApplicationBlock } from "@/modules/ApplicationBlock";

const CheckoutSendingApplicationPage = () => {
  const { deliveryOrder } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryOrder) {
      navigate(PATHS.CHECKOUT_VERIFICATION);
    }
  }, [deliveryOrder]);

  return (
    <>
      <Navbar />
      <ApplicationBlock />
    </>
  );
};

export default CheckoutSendingApplicationPage;
