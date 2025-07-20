import React from "react";
import { Navbar } from "@/modules/Navbar";
import MainDeliveryPageMainBlock from "../MainDeliveryPageMainBlock/MainDeliveryPageMainBlock.jsx";
import { useMediaQuery } from "react-responsive";

const MainDeliveryPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      {isMobile ? (
        <>
          <MainDeliveryPageMainBlock />
          <Navbar />
        </>
      ) : (
        <>
          <Navbar />
          <MainDeliveryPageMainBlock />
        </>
      )}
    </>
  );
};

export default MainDeliveryPage;
