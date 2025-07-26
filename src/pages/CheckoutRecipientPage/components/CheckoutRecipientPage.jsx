import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.ts";
import { Navbar } from "@/modules/Navbar";
import { RecipientBlock } from "@/modules/RecipientBlock";
import { useMediaQuery } from "react-responsive";

const CheckoutRecipientPage = () => {
  const { selectedOption } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!selectedOption) {
      navigate(PATHS.CHECKOUT_METHOD);
    }
  }, [selectedOption]);

  return (
    <>
      {!isMobile && <Navbar />}
      <RecipientBlock />
    </>
  );
};

export default CheckoutRecipientPage;
