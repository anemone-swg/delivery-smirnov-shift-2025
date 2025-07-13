import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./DeliveryBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { toast } from "react-toastify";

const DeliveryBlock = () => {
  const { deliveryData, setDeliveryData } = useDelivery();
  const navigate = useNavigate();

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
    const { street, houseNumber } = formState;
    if (!street.trim() || !houseNumber.trim()) {
      toast.warning("Не все поля заполнены.");
      return;
    }
    setDeliveryData(formState);
    navigate(PATHS.CHECKOUT_PAYMENT);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Куда доставить</p>
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
        <button
          className="whiteActionBtn"
          type="button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
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
