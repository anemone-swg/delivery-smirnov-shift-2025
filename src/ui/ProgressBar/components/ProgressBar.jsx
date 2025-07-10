import React from "react";
import styles from "./ProgressBar.module.scss";

const ProgressBar = ({ step }) => {
  const totalSteps = 7;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div className={styles.progressBar}>
        Шаг {step} из {totalSteps}
      </div>
      <div className={styles.progressBar__line}>
        <div
          className={styles.progressBar__progressFill}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
