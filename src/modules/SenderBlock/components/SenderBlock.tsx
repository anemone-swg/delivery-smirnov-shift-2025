import React, { useState } from "react";
import styles from "./SenderBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import { useDelivery } from "@/context/DeliveryContext";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import {
  hasMixedAlphabetsOfFullNameForm,
  validateFullNameField,
  validatePhone,
} from "@/helpers/validateFullNameForms";
import { FormTitle } from "@/components/FormTitle";
import { useMediaQuery } from "react-responsive";

const SenderBlock = () => {
  const { senderData, setSenderData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [formState, setFormState] = useState(() => ({
    lastName: senderData?.lastName || "",
    firstName: senderData?.firstName || "",
    middleName: senderData?.middleName || "",
    phone: senderData?.phone || "",
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    const { lastName, firstName, middleName, phone } = formState;

    if (
      !validateFullNameField(lastName, 1, 60, true) ||
      !validateFullNameField(firstName, 1, 60, false) ||
      !validateFullNameField(middleName, 1, 60, false, false)
    ) {
      return;
    }

    if (!hasMixedAlphabetsOfFullNameForm(lastName, firstName, middleName))
      return;

    if (!validatePhone(phone)) return;

    setSenderData(formState);
    navigate(PATHS.CHECKOUT_RECEPTION);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title={"Отправитель"} route={PATHS.CHECKOUT_RECIPIENT} />
      <ProgressBar step={3} />

      <div className={styles.checkoutBlock__form}>
        <input
          className="formInput"
          maxLength={60}
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={formState.lastName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={60}
          type="text"
          name="firstName"
          placeholder="Имя"
          value={formState.firstName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={60}
          type="text"
          name="middleName"
          placeholder="Отчество (при наличии)"
          value={formState.middleName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={14}
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
        {!isMobile && (
          <button
            className="whiteActionBtn"
            type="button"
            onClick={() => navigate(PATHS.CHECKOUT_RECIPIENT)}
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

export default SenderBlock;
