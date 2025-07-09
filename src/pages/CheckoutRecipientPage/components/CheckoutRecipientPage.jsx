import React, { useEffect } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";

const CheckoutRecipientPage = () => {
  const { selectedOption } = useDelivery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedOption) {
      navigate(PATHS.CHECKOUT_METHOD);
    }
  }, [selectedOption]);

  return (
    <div>
      <h2>Введите данные получателя</h2>
      <p>Вы выбрали:</p>
      <pre>{JSON.stringify(selectedOption, null, 2)}</pre>
    </div>
  );
};

export default CheckoutRecipientPage;
