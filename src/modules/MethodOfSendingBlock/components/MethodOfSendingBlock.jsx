import React from "react";
import styles from "@/styles/modules/Checkout.module.scss";
import { DeliveryTypeCard } from "@/components/DeliveryTypeCard";

const MethodOfSendingBlock = ({ result }) => {
  const step = 1;
  const totalSteps = 7;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Способ отправки</p>
      <div className={styles.checkoutBlock__stepInfo}>
        Шаг {step} из {totalSteps}
      </div>
      <div className={styles.checkoutBlock__progressBar}>
        <div
          className={styles.checkoutBlock__progressFill}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className={styles.checkoutBlock__options}>
        {result?.options?.map((option) => (
          <DeliveryTypeCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

export default MethodOfSendingBlock;
