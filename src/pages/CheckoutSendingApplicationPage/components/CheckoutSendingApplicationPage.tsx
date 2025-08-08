import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { Navbar } from "@/modules/Navbar";
import { ApplicationBlock } from "@/modules/ApplicationBlock";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/store/hooks";
import { selectDeliveryOrder } from "@/modules/VerificationBlock";
import { Loader } from "@/ui/Loader";

const CheckoutSendingApplicationPage = () => {
  const deliveryOrder = useAppSelector(selectDeliveryOrder);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!deliveryOrder?.packageId) {
      navigate(PATHS.CHECKOUT_VERIFICATION);
    }
  }, [deliveryOrder]);

  if (!deliveryOrder) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {!isMobile && <Navbar />}
      <Suspense fallback={<Loader />}>
        <ApplicationBlock />
      </Suspense>
    </>
  );
};

export default CheckoutSendingApplicationPage;
