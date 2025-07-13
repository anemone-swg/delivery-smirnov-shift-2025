import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { Navbar } from "@/modules/Navbar";
import { RecipientBlock } from "@/modules/RecipientBlock";

const CheckoutRecipientPage = () => {
  const { selectedOption } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedOption) {
      navigate(PATHS.CHECKOUT_METHOD);
    }
  }, [selectedOption]);

  return (
    <>
      <Navbar />
      <RecipientBlock />
    </>
  );
};

export default CheckoutRecipientPage;
