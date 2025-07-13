import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecipientBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { useDelivery } from "@/context/DeliveryContext";
import PATHS from "@/constants/paths.js";
import { toast } from "react-toastify";

const RecipientBlock = () => {
  const { recipientData, setRecipientData } = useDelivery();
  const navigate = useNavigate();

  const [formState, setFormState] = useState(() => ({
    lastName: recipientData?.lastName || "",
    firstName: recipientData?.firstName || "",
    middleName: recipientData?.middleName || "",
    phone: recipientData?.phone || "",
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    const { lastName, firstName, phone } = formState;
    if (!lastName.trim() || !firstName.trim() || !phone.trim()) {
      toast.warning("Не все поля заполнены.");
      return;
    }
    setRecipientData(formState);
    navigate(PATHS.CHECKOUT_SENDER);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Получатель</p>
      <ProgressBar step={2} />

      <div className={styles.checkoutBlock__form}>
        <input
          className="formInput"
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={formState.lastName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="firstName"
          placeholder="Имя"
          value={formState.firstName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          name="middleName"
          placeholder="Отчество (при наличии)"
          value={formState.middleName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="tel"
          name="phone"
          pattern="^\+7\d{10}$"
          title="Введите номер в формате +71234567890"
          placeholder="Номер телефона"
          value={formState.phone}
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

export default RecipientBlock;
