import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { ReceptionBlock } from "@/modules/ReceptionBlock";

const CheckoutReceptionPlacePage = () => {
  const { senderData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!senderData?.lastName) {
      navigate(PATHS.CHECKOUT_SENDER);
    }
  }, [senderData]);

  return (
    <>
      <Navbar />
      <ReceptionBlock />
    </>
  );
};

export default CheckoutReceptionPlacePage;
