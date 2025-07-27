import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { ApplicationBlock } from "@/modules/ApplicationBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutSendingApplicationPage = () => {
  const { deliveryOrder } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!deliveryOrder) {
      navigate(PATHS.CHECKOUT_VERIFICATION);
    }
  }, [deliveryOrder]);

  if (!deliveryOrder) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {!isMobile && <Navbar />}
      <ApplicationBlock />
    </>
  );
};

export default CheckoutSendingApplicationPage;
