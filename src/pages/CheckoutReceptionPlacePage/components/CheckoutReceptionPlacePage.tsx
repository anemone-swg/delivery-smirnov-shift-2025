import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { ReceptionBlock } from "@/modules/ReceptionBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectSenderData } from "@/modules/SenderBlock";

const CheckoutReceptionPlacePage = () => {
  const senderData = useAppSelector(selectSenderData);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!senderData?.lastName) {
      navigate(PATHS.CHECKOUT_SENDER);
    }
  }, [senderData]);

  return (
    <>
      {!isMobile && <Navbar />}
      <ReceptionBlock />
    </>
  );
};

export default CheckoutReceptionPlacePage;
