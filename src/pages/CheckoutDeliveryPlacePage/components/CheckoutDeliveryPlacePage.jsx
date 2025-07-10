import React, { useEffect } from "react";
import PATHS from "@/constants/paths.js";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { Navbar } from "@/modules/Navbar";
import { DeliveryBlock } from "@/modules/DeliveryBlock";

const CheckoutDeliveryPlacePage = () => {
  const { setReceptionData } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!setReceptionData) {
      navigate(PATHS.CHECKOUT_RECEPTION);
    }
  }, [setReceptionData]);

  return (
    <>
      <Navbar />
      <DeliveryBlock />
    </>
  );
};

export default CheckoutDeliveryPlacePage;
