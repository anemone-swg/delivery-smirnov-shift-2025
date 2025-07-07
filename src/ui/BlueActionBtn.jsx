import React from "react";
import styles from "./BlueActionBtn.module.scss";

const BlueActionBtn = ({ type = "button", action, children }) => {
  return (
    <button type={type} onClick={action} className={styles.blueActionBtn}>
      {children}
    </button>
  );
};

export default BlueActionBtn;
