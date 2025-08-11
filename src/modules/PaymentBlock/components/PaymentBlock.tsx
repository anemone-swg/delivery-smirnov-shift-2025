import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import styles from "./PaymentBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";
import type { PayerType } from "@/types/delivery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPaymentData } from "../store/selectors";
import { paymentBlockActions } from "../store/slice";

const PaymentBlock = () => {
  const paymentData = useAppSelector(selectPaymentData);
  const [selectedPayer, setSelectedPayer] = useState(paymentData.value);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    dispatch(
      paymentBlockActions.setPaymentData({
        value: selectedPayer,
        isCompleted: true,
      }),
    );
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
            onChange={(e) => setSelectedPayer(e.target.value as PayerType)}
          />
          Получатель
        </label>

        <label className={styles.checkoutBlock__radioLabel}>
          <input
            type="radio"
            name="payer"
            value="SENDER"
            checked={selectedPayer === "SENDER"}
            onChange={(e) => setSelectedPayer(e.target.value as PayerType)}
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
