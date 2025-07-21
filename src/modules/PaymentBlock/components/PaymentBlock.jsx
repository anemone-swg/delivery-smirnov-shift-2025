import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./PaymentBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";

const PaymentBlock = () => {
  const { paymentData, setPaymentData } = useDelivery();
  const [selectedPayer, setSelectedPayer] = useState(paymentData.value || "");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleContinue = () => {
    setPaymentData({
      value: selectedPayer,
      isCompleted: true,
    });
    navigate(PATHS.CHECKOUT_VERIFICATION);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title={"Оплата доставки"} route={PATHS.CHECKOUT_DELIVERY} />
      <ProgressBar step={6} />

      <div className={styles.checkoutBlock__form}>
        <label className={styles.checkoutBlock__radioLabel}>
          <input
            type="radio"
            name="payer"
            value="RECEIVER"
            checked={selectedPayer === "RECEIVER"}
            onChange={(e) => setSelectedPayer(e.target.value)}
          />
          Получатель
        </label>

        <label className={styles.checkoutBlock__radioLabel}>
          <input
            type="radio"
            name="payer"
            value="SENDER"
            checked={selectedPayer === "SENDER"}
            onChange={(e) => setSelectedPayer(e.target.value)}
          />
          Отправитель
        </label>
      </div>

      <div className={styles.checkoutBlock__buttons}>
        {!isMobile && (
          <button
            className="whiteActionBtn"
            type="button"
            onClick={() => navigate(PATHS.CHECKOUT_DELIVERY)}
          >
            Назад
          </button>
        )}
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
