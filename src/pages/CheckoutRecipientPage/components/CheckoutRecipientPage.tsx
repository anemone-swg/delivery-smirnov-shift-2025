import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { RecipientBlock } from "@/modules/RecipientBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedOption } from "@/components/DeliveryTypeCard";

const CheckoutRecipientPage = () => {
  const selectedOption = useAppSelector(selectSelectedOption);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!selectedOption?.id) {
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
