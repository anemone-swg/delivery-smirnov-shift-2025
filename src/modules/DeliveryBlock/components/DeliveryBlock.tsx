import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import styles from "./DeliveryBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import {
  hasMixedAlphabetsOfAddressForm,
  validateAddressField,
} from "@/helpers/validateAdressForms";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectDeliveryData } from "../store/selectors";
import { deliveryBlockActions } from "../store/slice";

const DeliveryBlock = () => {
  const deliveryData = useAppSelector(selectDeliveryData);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState(() => ({
    street: deliveryData?.street,
    house: deliveryData?.house,
    apartment: deliveryData?.apartment,
    comment: deliveryData?.comment,
    isNonContact: deliveryData?.isNonContact,
  }));

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, isNonContact: event.target.checked }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    const { street, house, apartment, comment } = formState;
    if (
      !validateAddressField(street, 1, 100, true) ||
      !validateAddressField(house, 1, 100, true) ||
      !validateAddressField(apartment, 0, 100, false) ||
      !validateAddressField(comment, 1, 300, false, true)
    ) {
      return;
    }

    if (!hasMixedAlphabetsOfAddressForm(street, house, apartment)) return;

    dispatch(deliveryBlockActions.setDeliveryData(formState));
    navigate(PATHS.CHECKOUT_PAYMENT);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title={"Куда доставить"} route={PATHS.CHECKOUT_RECEPTION} />
      <ProgressBar step={5} />

      <div className={styles.checkoutBlock__form}>
        <input
          className="formInput"
          type="text"
          name="street"
          placeholder="Улица"
          value={formState.street}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="house"
          placeholder="Номер дома"
          value={formState.house}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="apartment"
          placeholder="Номер квартиры"
          value={formState.apartment}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="comment"
          placeholder="Заметка для курьера"
          value={formState.comment}
          onChange={handleChange}
        />

        <label className={styles.checkoutBlock__checkboxLabel}>
          <input
            type="checkbox"
            checked={formState.isNonContact}
            onChange={handleCheckboxChange}
          />
          <span className={styles.checkoutBlock__labelText}>
            Оставить заказ у двери
            <span className={styles.checkoutBlock__tooltipIcon}>?</span>
            <div className={styles.checkoutBlock__tooltipText}>
              Курьер привозит заказ, оставляет его у двери и уходит, а вам
              приходит уведомление на телефон о том, что заказ доставлен.
            </div>
          </span>
        </label>
      </div>

      <div className={styles.checkoutBlock__buttons}>
        {!isMobile && (
          <button
            className="whiteActionBtn"
            type="button"
            onClick={() => navigate(PATHS.CHECKOUT_RECEPTION)}
          >
            Назад
          </button>
        )}
        <button
          className="blueActionBtn"
          type="button"
          onClick={handleContinue}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default DeliveryBlock;
