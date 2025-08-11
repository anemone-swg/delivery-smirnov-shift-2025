import styles from "./DeliveryTypeCard.module.scss";
import { FaTrainSubway } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import getWorkingDaysText from "@/helpers/getWorkingDaysText";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import type { DeliveryOption } from "@/types/delivery";
import { deliveryTypeCardActions } from "../store/slice";
import { useAppDispatch } from "@/store/hooks";
import { JSX } from "react";

/**
 * Props компонента DeliveryTypeCard.
 * @property {DeliveryOption} option - Опция доставки
 * */
export interface DeliveryTypeCardProps {
  option: DeliveryOption;
}

/**
 * React-компонент, отображающий карточку опции доставки.
 * При клике выбирает данную опцию и переходит к шагу выбора получателя.
 *
 * @param {DeliveryTypeCardProps} props - Свойства компонента
 * @returns {JSX.Element} JSX-элемент карточки доставки
 */
const DeliveryTypeCard = ({ option }: DeliveryTypeCardProps): JSX.Element => {
  const { name, type, price, days } = option;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deliveryTypeCardActions.setSelectedOption(option));
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
