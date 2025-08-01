import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { SenderBlock } from "@/modules/SenderBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectRecipientData } from "@/modules/RecipientBlock";

const CheckoutSenderPage = () => {
  const recipientData = useAppSelector(selectRecipientData);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!recipientData?.lastName) {
      navigate(PATHS.CHECKOUT_RECIPIENT);
    }
  }, [recipientData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <SenderBlock />
    </>
  );
};

export default CheckoutSenderPage;
