import React from "react";
import styles from "./MainDeliveryBlockActions.module.scss";
import BlueActionBtn from "@/ui/BlueActionBtn.jsx";

const MainDeliveryBlockActions = () => {
  return (
    <div className={styles.deliveryBlockActions}>
      <div className={styles.deliveryBlockActions__trackingBlock}>
        <p className={styles.deliveryBlockActions__formTitle}>
          Отследить посылку
        </p>
        <div className={styles.deliveryBlockActions__trackingInput}>
          <input type="text" placeholder={"Номер заказа"} />
          <BlueActionBtn>Найти</BlueActionBtn>
        </div>
      </div>
      <div className={styles.deliveryBlockActions__promotionBlock}></div>
    </div>
  );
};

export default MainDeliveryBlockActions;
