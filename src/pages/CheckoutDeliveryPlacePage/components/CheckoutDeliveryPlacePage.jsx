import React, { useEffect } from "react";
import PATHS from "@/constants/paths.js";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { Navbar } from "@/modules/Navbar";
import { DeliveryBlock } from "@/modules/DeliveryBlock";

const CheckoutDeliveryPlacePage = () => {
  const { receptionData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!receptionData?.street) {
      navigate(PATHS.CHECKOUT_RECEPTION);
    }
  }, [receptionData]);

  return (
    <>
      <Navbar />
      <DeliveryBlock />
    </>
  );
};

export default CheckoutDeliveryPlacePage;
