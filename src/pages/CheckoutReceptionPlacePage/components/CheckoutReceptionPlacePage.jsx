import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { ReceptionBlock } from "@/modules/ReceptionBlock";

const CheckoutReceptionPlacePage = () => {
  const { setSenderData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!setSenderData) {
      navigate(PATHS.CHECKOUT_SENDER);
    }
  }, [setSenderData]);

  return (
    <>
      <Navbar />
      <ReceptionBlock />
    </>
  );
};

export default CheckoutReceptionPlacePage;
