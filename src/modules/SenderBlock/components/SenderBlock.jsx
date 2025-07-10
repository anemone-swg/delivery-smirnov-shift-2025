import React, { useState } from "react";
import styles from "./SenderBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar/index.js";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { toast } from "react-toastify";

const SenderBlock = () => {
  const { senderData, setSenderData } = useDelivery();
  const navigate = useNavigate();

  const [formState, setFormState] = useState(() => ({
    lastName: senderData?.lastName || "",
    firstName: senderData?.firstName || "",
    middleName: senderData?.middleName || "",
    phone: senderData?.phone || "",
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
    setSenderData(formState);
    navigate(PATHS.CHECKOUT_RECEPTION);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Отправитель</p>
      <ProgressBar step={3} />

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

export default SenderBlock;
