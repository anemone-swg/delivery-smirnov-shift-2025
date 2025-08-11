import styles from "./ProgressBar.module.scss";
import React, { JSX } from "react";

/**
 * Props компонента ProgressBar.
 *
 * @property {number} step - Текущий шаг прогресса.
 */
export interface ProgressBarProps {
  step: number;
}

/**
 * Компонент отображает индикатор прогресса с числом текущего шага и визуальной полосой.
 *
 * @component
 * @param {ProgressBarProps} props - Props компонента.
 * @returns {JSX.Element} Компонент прогресс-бара.
 */
const ProgressBar = ({ step }: ProgressBarProps): JSX.Element => {
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

export default React.memo(ProgressBar) as typeof ProgressBar;
