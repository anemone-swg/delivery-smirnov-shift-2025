import React from "react";
import styles from "@/modules/MethodOfSendingBlock/components/MethodOfSendingBlock.module.scss";
import { DeliveryTypeCard } from "@/components/DeliveryTypeCard";
import { ProgressBar } from "@/ui/ProgressBar";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { IoClose } from "react-icons/io5";
import PATHS from "@/constants/paths.js";
import { FormTitle } from "@/components/FormTitle/index.js";

const MethodOfSendingBlock = () => {
  const { deliveryForm } = useDelivery();

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title="Способ отправки" icon={IoClose} route={PATHS.MAIN} />
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
