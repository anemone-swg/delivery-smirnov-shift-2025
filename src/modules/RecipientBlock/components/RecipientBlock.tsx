import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecipientBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import {
  hasMixedAlphabetsOfFullNameForm,
  validateFullNameField,
  validatePhone,
} from "@/helpers/validateFullNameForms";
import PATHS from "@/constants/paths";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";
import { recipientBlockActions } from "../store/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectRecipientData } from "../store/selectors";

const RecipientBlock = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const recipientData = useAppSelector(selectRecipientData);
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState(() => ({
    lastName: recipientData?.lastName,
    firstName: recipientData?.firstName,
    middleName: recipientData?.middleName,
    phone: recipientData?.phone,
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

    dispatch(recipientBlockActions.setRecipientData(formState));
    navigate(PATHS.CHECKOUT_SENDER);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title={"Получатель"} route={PATHS.CHECKOUT_METHOD} />
      <ProgressBar step={2} />

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
          type="text"
          maxLength={60}
          name="firstName"
          placeholder="Имя"
          value={formState.firstName}
          onChange={handleChange}
        />
        <input
          className="formInput"
          type="text"
          maxLength={60}
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
            onClick={() => navigate(PATHS.CHECKOUT_METHOD)}
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

export default RecipientBlock;
