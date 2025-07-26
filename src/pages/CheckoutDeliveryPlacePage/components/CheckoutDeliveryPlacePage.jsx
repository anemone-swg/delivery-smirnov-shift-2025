import React, { useEffect } from "react";
import PATHS from "@/constants/paths.ts";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { Navbar } from "@/modules/Navbar";
import { DeliveryBlock } from "@/modules/DeliveryBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutDeliveryPlacePage = () => {
  const { receptionData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!receptionData?.street) {
      navigate(PATHS.CHECKOUT_RECEPTION);
    }
  }, [receptionData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <DeliveryBlock />
    </>
  );
};

export default CheckoutDeliveryPlacePage;
