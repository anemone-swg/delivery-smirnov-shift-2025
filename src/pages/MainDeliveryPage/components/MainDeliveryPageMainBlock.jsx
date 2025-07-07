import React from "react";
import styles from "@/pages/MainDeliveryPage/components/MainDeliveryPageMainBlock.module.scss";
import MainDeliveryInfo from "@/modules/MainDeliveyInfo/MainDeliveyInfo.jsx";
import MainDeliveryForm from "@/modules/MainDeliveryForm/MainDeliveryForm.jsx";
import MainDeliveryBlockActions from "@/modules/MainDeliveryBlockActions/MainDeliveryBlockActions.jsx";

const MainDeliveryPageMainBlock = () => {
  return (
    <div className={styles.mainBlock}>
      <MainDeliveryInfo />
      <MainDeliveryForm />
      <MainDeliveryBlockActions />
    </div>
  );
};

export default MainDeliveryPageMainBlock;
