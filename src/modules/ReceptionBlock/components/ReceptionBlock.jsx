import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./ReceptionBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { toast } from "react-toastify";

const ReceptionBlock = () => {
  const { receptionData, setReceptionData } = useDelivery();
  const navigate = useNavigate();

  const [formState, setFormState] = useState(() => ({
    street: receptionData?.street || "",
    houseNumber: receptionData?.houseNumber || "",
    apartmentNumber: receptionData?.apartmentNumber || "",
    note: receptionData?.note || "",
  }));

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
    setReceptionData(formState);
    navigate(PATHS.CHECKOUT_DELIVERY);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Откуда забрать</p>
      <ProgressBar step={4} />

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

export default ReceptionBlock;
