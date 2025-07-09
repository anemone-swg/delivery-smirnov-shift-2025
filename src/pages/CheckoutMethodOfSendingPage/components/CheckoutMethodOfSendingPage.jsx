import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/Navbar";
import { MethodOfSendingBlock } from "@/modules/MethodOfSendingBlock";
import PATHS from "@/constants/paths.js";

const CheckoutMethodOfSendingPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("deliveryResult");

    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (e) {
        console.error("Ошибка при разборе deliveryResult:", e);
        navigate(PATHS.MAIN);
      }
    } else {
      navigate(PATHS.MAIN);
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <MethodOfSendingBlock result={result} />
    </>
  );
};

export default CheckoutMethodOfSendingPage;
