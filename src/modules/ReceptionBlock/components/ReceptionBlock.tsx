import React, { useState } from "react";
import { useDelivery } from "@/context/DeliveryContext";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import styles from "./ReceptionBlock.module.scss";
import { ProgressBar } from "@/ui/ProgressBar";
import {
  hasMixedAlphabetsOfAddressForm,
  validateAddressField,
} from "@/helpers/validateAdressForms";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";

const ReceptionBlock = () => {
  const { receptionData, setReceptionData } = useDelivery();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [formState, setFormState] = useState(() => ({
    street: receptionData?.street || "",
    house: receptionData?.house || "",
    apartment: receptionData?.apartment || "",
    comment: receptionData?.comment || "",
  }));

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
          name="house"
          placeholder="Номер дома"
          value={formState.house}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={100}
          type="text"
          name="apartment"
          placeholder="Номер квартиры"
          value={formState.apartment}
          onChange={handleChange}
        />
        <input
          className="formInput"
          maxLength={300}
          type="text"
          name="comment"
          placeholder="Заметка для курьера"
          value={formState.comment}
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
