import React from "react";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/DeliveryContext.jsx";
import PATHS from "@/constants/paths.js";
import styles from "./ApplicationBlock.module.scss";

const ApplicationBlock = () => {
  const navigate = useNavigate();
  const { selectedOption, deliveryData, paymentData, resetDeliveryData } =
    useDelivery();

  const orderNumber = () => {
    return Math.floor(100000 + Math.random() * 10000);
  };

  const handleContinue = () => {
    resetDeliveryData();
    navigate(PATHS.MAIN);
  };

  return (
    <div className={styles.checkoutBlock}>
      <p className={styles.checkoutBlock__header}>Заявка отправлена</p>
      <p>
        {paymentData.value === "SENDER"
          ? "Вы можете оплатить ваш заказ в разделе профиль"
          : "Получатель оплатит заказ"}
      </p>

      <div className={styles.checkoutBlock__form}>
        <div className={styles.checkoutBlock__info}>
          <span>Номер заказа</span>
          <span>{orderNumber()}</span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Статус</span>
          <span>Создан</span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Адрес доставки</span>
          <span>
            {/*ул. {deliveryData.street}, д. {deliveryData.houseNumber}*/}
            {/*{deliveryData.apartmentNumber*/}
            {/*  ? `, кв. ${deliveryData.apartmentNumber}`*/}
            {/*  : ""}*/}
            {deliveryData.street} {deliveryData.houseNumber},{" "}
            {deliveryData.apartmentNumber}
          </span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Тип доставки</span>
          <span>{selectedOption.name}</span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Вся информация была продублирована в SMS</span>
        </div>
      </div>

      <div className={styles.checkoutBlock__buttons}>
        <button
          className="whiteActionBtn"
          type="button"
          onClick={() => navigate(PATHS.CHECKOUT_VERIFICATION)}
        >
          Статус
        </button>
        <button
          className="blueActionBtn"
          type="button"
          onClick={handleContinue}
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default ApplicationBlock;
