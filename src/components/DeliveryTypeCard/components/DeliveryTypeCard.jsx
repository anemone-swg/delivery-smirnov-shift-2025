import React from "react";
import styles from "./DeliveryTypeCard.module.scss";
import { FaTrainSubway } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import getWorkingDaysText from "../helpers/getWorkingDaysText.js";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import PATHS from "@/constants/paths.js";

const DeliveryTypeCard = ({ option }) => {
  const { name, type, price, days } = option;
  const { setSelectedOption } = useDelivery();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedOption(option);
    navigate(PATHS.CHECKOUT_RECIPIENT);
  };

  return (
    <div className={styles.typeCard} onClick={handleClick}>
      <div className={styles.typeCard__icon}>
        {type === "DEFAULT" ? <FaTrainSubway /> : <FaPlane />}
      </div>
      <div className={styles.typeCard__block}>
        <div className={styles.typeCard__header}>
          <p>{name}</p>
        </div>
        <div className={styles.typeCard__info}>
          <p>{price} ₽</p>
          <p>{getWorkingDaysText(days)}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTypeCard;
