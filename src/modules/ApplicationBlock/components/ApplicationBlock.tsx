import React from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import styles from "./ApplicationBlock.module.scss";
import { IoClose } from "react-icons/io5";
import { FormTitle } from "@/components/FormTitle";
import { useMediaQuery } from "react-responsive";
import {
  createAppSelector,
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";
import { resetDeliveryData } from "@/store/thunks";
import { selectDeliveryData } from "@/modules/DeliveryBlock";
import { selectSelectedOption } from "@/components/DeliveryTypeCard";
import { selectPaymentData } from "@/modules/PaymentBlock";

const selectApplicationData = createAppSelector(
  [selectSelectedOption, selectDeliveryData, selectPaymentData],
  (selectedOption, deliveryData, paymentData) => ({
    selectedOption,
    deliveryData,
    paymentData,
  }),
);

const ApplicationBlock = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { selectedOption, deliveryData, paymentData } = useAppSelector(
    selectApplicationData,
  );

  const orderNumber = () => {
    return Math.floor(100000 + Math.random() * 10000);
  };

  const handleContinue = () => {
    dispatch(resetDeliveryData());
    navigate(PATHS.MAIN);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle
        title={"Заявка отправлена"}
        icon={IoClose}
        onClick={handleContinue}
      />
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
            {deliveryData.street} {deliveryData.house}
            {deliveryData.apartment ? `, ${deliveryData.apartment}` : ""}
          </span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Тип доставки</span>
          <span>{selectedOption?.name}</span>
        </div>
        <div className={styles.checkoutBlock__info}>
          <span>Вся информация была продублирована в SMS</span>
        </div>
      </div>

      <div className={styles.checkoutBlock__buttons}>
        <button
          className={!isMobile ? "whiteActionBtn" : "blueActionBtn"}
          type="button"
          onClick={() => navigate(PATHS.CHECKOUT_VERIFICATION)}
        >
          Статус
        </button>

        {!isMobile && (
          <button
            className="blueActionBtn"
            type="button"
            onClick={handleContinue}
          >
            На главную
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationBlock;
