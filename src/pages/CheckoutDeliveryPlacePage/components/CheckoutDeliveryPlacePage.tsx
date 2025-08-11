import React, { useEffect } from "react";
import PATHS from "@/constants/paths";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { DeliveryBlock } from "@/modules/DeliveryBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectReceptionData } from "@/modules/ReceptionBlock";

const CheckoutDeliveryPlacePage = () => {
  const receptionData = useAppSelector(selectReceptionData);
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
