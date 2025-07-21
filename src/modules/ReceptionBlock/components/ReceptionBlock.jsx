import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import styles from "./ReceptionBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import {
  hasMixedAlphabetsOfAddressForm,
  validateAddressField,
} from "@/helpers/validateAdressForms.js";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";

const ReceptionBlock = () => {
  const { receptionData, setReceptionData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

    setReceptionData(formState);
    navigate(PATHS.CHECKOUT_DELIVERY);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle title={"Откуда забрать"} route={PATHS.CHECKOUT_SENDER} />
      <ProgressBar step={4} />

      <div className={styles.checkoutBlock__form}>
        <input
          className="formInput"
          maxLength={100}
          type="text"
          name="street"
          placeholder="Улица"
          value={formState.street}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={100}
          type="text"
          name="houseNumber"
          placeholder="Номер дома"
          value={formState.houseNumber}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={100}
          type="text"
          name="apartmentNumber"
          placeholder="Номер квартиры"
          value={formState.apartmentNumber}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={300}
          type="text"
          name="note"
          placeholder="Заметка для курьера"
          value={formState.note}
          onChange={handleChange}
        />
      </div>

      <div className={styles.checkoutBlock__buttons}>
        {!isMobile && (
          <button
            className="whiteActionBtn"
            type="button"
            onClick={() => navigate(PATHS.CHECKOUT_SENDER)}
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

export default ReceptionBlock;
