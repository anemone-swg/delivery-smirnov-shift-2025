import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./PaymentBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";

const PaymentBlock = () => {
  const { paymentData, setPaymentData } = useDelivery();
  const [selectedPayer, setSelectedPayer] = useState(paymentData || "");
  const navigate = useNavigate();

  const handleContinue = () => {
    setPaymentData(selectedPayer);
    navigate(PATHS.CHECKOUT_VERIFICATION);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Оплата доставки</p>
      <ProgressBar step={6} />

      <div className={styles.checkoutBlock__form}>
        <label className={styles.checkoutBlock__radioLabel}>
          <input
            type="radio"
            name="payer"
            value="recipient"
            checked={selectedPayer === "recipient"}
            onChange={(e) => setSelectedPayer(e.target.value)}
          />
          Получатель
        </label>

        <label className={styles.checkoutBlock__radioLabel}>
          <input
            type="radio"
            name="payer"
            value="sender"
            checked={selectedPayer === "sender"}
            onChange={(e) => setSelectedPayer(e.target.value)}
          />
          Отправитель
        </label>
      </div>

      <div className={styles.checkoutBlock__buttons}>
        <button
          className="whiteActionBtn"
          type="button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
        <button
          className="blueActionBtn"
          type="button"
          onClick={handleContinue}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default PaymentBlock;
