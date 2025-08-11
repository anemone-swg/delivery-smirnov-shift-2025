import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { MethodOfSendingBlock } from "@/modules/MethodOfSendingBlock";
import PATHS from "@/constants/paths";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectDeliveryForm } from "@/modules/MainDeliveryForm";

const CheckoutMethodOfSendingPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const deliveryForm = useAppSelector(selectDeliveryForm);

  useEffect(() => {
    if (!deliveryForm) {
      navigate(PATHS.MAIN);
    }
  }, [deliveryForm]);

  return (
    <>
      {!isMobile && <Navbar />}
      <MethodOfSendingBlock />
    </>
  );
};

export default CheckoutMethodOfSendingPage;
