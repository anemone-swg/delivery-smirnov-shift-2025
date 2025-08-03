import React from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths";
import { ProgressBar } from "@/ui/ProgressBar";
import styles from "./VerificationBlock.module.scss";
import getWorkingDaysText from "@/helpers/getWorkingDaysText";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";
import type { DeliveryOrderRequest } from "@/types/delivery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verificationBlockActions } from "../store/slice";
import {
  selectFromCity,
  selectPackageType,
  selectToCity,
} from "@/modules/MainDeliveryForm";
import { selectReceptionData } from "@/modules/ReceptionBlock";
import { selectSenderData } from "@/modules/SenderBlock";
import { selectDeliveryData } from "@/modules/DeliveryBlock";
import { selectSelectedOption } from "@/components/DeliveryTypeCard";
import { selectPaymentData } from "@/modules/PaymentBlock";
import { selectRecipientData } from "@/modules/RecipientBlock";

const VerificationBlock = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch();
  const {
    packageType,
    toCity,
    fromCity,
    recipientData,
    senderData,
    receptionData,
    deliveryData,
    selectedOption,
    paymentData,
  } = useAppSelector((state) => ({
    packageType: selectPackageType(state),
    toCity: selectToCity(state),
    fromCity: selectFromCity(state),
    recipientData: selectRecipientData(state),
    senderData: selectSenderData(state),
    receptionData: selectReceptionData(state),
    deliveryData: selectDeliveryData(state),
    selectedOption: selectSelectedOption(state),
    paymentData: selectPaymentData(state),
  }));

  const handleContinue = () => {
    if (!packageType || !selectedOption || !fromCity || !toCity) {
      return;
    }

    const data: DeliveryOrderRequest = {
      packageId: packageType.id,
      optionType: selectedOption.type,
      senderPointId: fromCity.id,
      senderAddress: {
        street: receptionData.street,
        house: receptionData.house,
        apartment: receptionData.apartment,
        comment: receptionData.comment,
      },
      sender: {
        firstName: senderData.firstName,
        lastName: senderData.lastName,
        middleName: senderData.middleName,
        phone: senderData.phone,
      },
      receiverPointId: toCity.id,
      receiverAddress: {
        street: deliveryData.street,
        house: deliveryData.house,
        apartment: deliveryData.apartment,
        comment: deliveryData.comment,
        isNonContact: deliveryData.isNonContact,
      },
      receiver: {
        firstName: recipientData.firstName,
        lastName: recipientData.lastName,
        middleName: recipientData.middleName,
        phone: recipientData.phone,
      },
      payer: paymentData.value,
    };

    // postDeliveryOrder(data).then((res) => {
    //   setDeliveryOrder(res);
    //   navigate(PATHS.CHECKOUT_SENDING);
    // });

    dispatch(verificationBlockActions.setDeliveryOrder(data));
    navigate(PATHS.CHECKOUT_SENDING);
  };

  return (
    <div className={styles.checkoutBlock}>
      <FormTitle
        title={"Проверка данных заказа"}
        route={PATHS.CHECKOUT_PAYMENT}
      />
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
              {receptionData.street} {receptionData.house}
              {receptionData.apartment ? `, ${receptionData.apartment}` : ""}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Заметка</p>
            <p>{receptionData.comment || "—"}</p>
          </div>
        </div>

        <div className={styles.checkoutBlock__section}>
          <h3 className={styles.checkoutBlock__sectionName}>Куда доставить</h3>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Адрес</p>
            <p>
              {deliveryData.street} {deliveryData.house}
              {deliveryData.apartment ? `, ${deliveryData.apartment}` : ""}
            </p>
          </div>
          <div className={styles.checkoutBlock__sectionInfo}>
            <p>Заметка</p>
            <p>{deliveryData.comment || "—"}</p>
          </div>
        </div>
      </div>

      <div className={styles.checkoutBlock__additionalInfo}>
        <strong>Итого: {selectedOption?.price} ₽</strong>
        <p>
          Тариф: {selectedOption?.name}{" "}
          {deliveryData.isNonContact ? "до двери" : ""}
        </p>
        {selectedOption.days && (
          <p>Срок: {getWorkingDaysText(selectedOption.days)}</p>
        )}
      </div>

      <div className={styles.checkoutBlock__buttons}>
        {!isMobile && (
          <button
            className="whiteActionBtn"
            type="button"
            onClick={() => navigate(PATHS.CHECKOUT_PAYMENT)}
          >
            Назад
          </button>
        )}
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
