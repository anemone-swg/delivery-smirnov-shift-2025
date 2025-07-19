import React from "react";
import styles from "@/modules/MethodOfSendingBlock/components/MethodOfSendingBlock.module.scss";
import { DeliveryTypeCard } from "@/components/DeliveryTypeCard";
import { ProgressBar } from "@/ui/ProgressBar";
import { useDelivery } from "@/context/DeliveryContext.jsx";

const MethodOfSendingBlock = () => {
  const { deliveryForm } = useDelivery();

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Способ отправки</p>
      <ProgressBar step={1} />
      <div className={styles.checkoutBlock__options}>
        {deliveryForm?.options?.map((option) => (
          <DeliveryTypeCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
};

export default MethodOfSendingBlock;
