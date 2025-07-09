import React from "react";
import styles from "./MainDeliveryPageMainBlock.module.scss";
import { MainDeliveryInfo } from "@/modules/MainDeliveryInfo";
import { MainDeliveryBlockActions } from "@/modules/MainDeliveryBlockActions";
import { MainDeliveryForm } from "@/modules/MainDeliveryForm";

const MainDeliveryPageMainBlock = () => (
  <div className={styles.mainBlock}>
    <MainDeliveryInfo />
    <MainDeliveryForm />
    <MainDeliveryBlockActions />
  </div>
);

export default MainDeliveryPageMainBlock;
