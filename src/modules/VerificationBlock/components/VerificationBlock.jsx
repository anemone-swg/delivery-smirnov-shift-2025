import React from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.js";
import { ProgressBar } from "@/ui/ProgressBar";
import styles from "./VerificationBlock.module.scss";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import getWorkingDaysText from "@/helpers/getWorkingDaysText.js";

const VerificationBlock = () => {
  const navigate = useNavigate();
  const {
    recipientData,
    senderData,
    receptionData,
    deliveryData,
    selectedOption,
    setIsConfirmed,
  } = useDelivery();

  const handleContinue = () => {
    setIsConfirmed(true);
    navigate(PATHS.CHECKOUT_SENDING);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Проверка данных заказа</p>
      <ProgressBar step={7} />

      <div className={styles.checkoutBlock__form}>
        <div className={styles.checkoutBlock__section}>
          <h3 className={styles.checkoutBlock__sectionName}>Получатель</h3>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>ФИО</p>
            <p>
              {recipientData.lastName} {recipientData.firstName}{" "}
              {recipientData.middleName}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Телефон</p>
            <p>{recipientData.phone}</p>
          </div>
        </div>

        <div className={styles.checkoutBlock__section}>
          <h3 className={styles.checkoutBlock__sectionName}>Отправитель</h3>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>ФИО</p>
            <p>
              {senderData.lastName} {senderData.firstName}{" "}
              {senderData.middleName}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Телефон</p>
            <p>{senderData.phone}</p>
          </div>
        </div>

        <div className={styles.checkoutBlock__section}>
          <h3 className={styles.checkoutBlock__sectionName}>Откуда забрать</h3>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Адрес</p>
            <p>
              ул. {receptionData.street}, д. {receptionData.houseNumber}
              {receptionData.apartmentNumber
                ? `, кв. ${receptionData.apartmentNumber}`
                : ""}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Заметка</p>
            <p>{receptionData.note || "—"}</p>
          </div>
        </div>

        <div className={styles.checkoutBlock__section}>
          <h3 className={styles.checkoutBlock__sectionName}>Куда доставить</h3>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Адрес</p>
            <p>
              ул. {deliveryData.street}, д. {deliveryData.houseNumber}
              {deliveryData.apartmentNumber
                ? `, кв. ${deliveryData.apartmentNumber}`
                : ""}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Заметка</p>
            <p>{deliveryData.note || "—"}</p>
          </div>
        </div>
      </div>

      <div className={styles.checkoutBlock__additionalInfo}>
        <strong>Итого: {selectedOption.price} ₽</strong>
        <p>
          Тариф: {selectedOption.name}{" "}
          {deliveryData.leaveAtDoor ? "до двери" : ""}
        </p>
        <p>Срок: {getWorkingDaysText(selectedOption.days)}</p>
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
          Отправить
        </button>
      </div>
    </div>
  );
};

export default VerificationBlock;
