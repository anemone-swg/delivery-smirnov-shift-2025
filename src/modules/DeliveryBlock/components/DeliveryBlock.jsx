import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./DeliveryBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import {
  hasMixedAlphabetsOfAddressForm,
  validateAddressField,
} from "@/helpers/validateAdressForms.js";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";

const DeliveryBlock = () => {
  const { deliveryData, setDeliveryData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [formState, setFormState] = useState(() => ({
    street: deliveryData?.street || "",
    houseNumber: deliveryData?.houseNumber || "",
    apartmentNumber: deliveryData?.apartmentNumber || "",
    note: deliveryData?.note || "",
    leaveAtDoor: deliveryData?.leaveAtDoor || "",
  }));

  const handleCheckboxChange = (event) => {
    setFormState((prev) => ({ ...prev, leaveAtDoor: event.target.checked }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    const { street, houseNumber, apartmentNumber, note } = formState;
    if (
      !validateAddressField(street, 1, 100, true) ||
      !validateAddressField(houseNumber, 1, 100, true) ||
      !validateAddressField(apartmentNumber, 0, 100, false) ||
      !validateAddressField(note, 1, 300, false, true)
    ) {
      return;
    }

    if (!hasMixedAlphabetsOfAddressForm(street, houseNumber, apartmentNumber))
      return;

    setDeliveryData(formState);
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
          name="houseNumber"
          placeholder="Номер дома"
          value={formState.houseNumber}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="apartmentNumber"
          placeholder="Номер квартиры"
          value={formState.apartmentNumber}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="note"
          placeholder="Заметка для курьера"
          value={formState.note}
          onChange={handleChange}
        />

        <label className={styles.checkoutBlock__checkboxLabel}>
          <input
            type="checkbox"
            checked={formState.leaveAtDoor}
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
