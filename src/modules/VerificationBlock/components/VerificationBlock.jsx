import React from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/constants/paths.ts";
import { ProgressBar } from "@/ui/ProgressBar";
import styles from "./VerificationBlock.module.scss";
import { useDelivery } from "@/context/DeliveryContext.tsx";
import getWorkingDaysText from "@/helpers/getWorkingDaysText.ts";
import { useMediaQuery } from "react-responsive";
import { FormTitle } from "@/components/FormTitle";

const VerificationBlock = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {
    packageType,
    fromCity,
    toCity,
    recipientData,
    senderData,
    receptionData,
    deliveryData,
    selectedOption,
    setDeliveryOrder,
    paymentData,
  } = useDelivery();

  const handleContinue = () => {
    const data = {
      packageId: packageType.id,
      optionType: selectedOption.type,
      senderPointId: fromCity.id,
      senderAddress: {
        street: receptionData.street,
        house: receptionData.houseNumber,
        apartment: receptionData.apartmentNumber,
        comment: receptionData.note,
      },
      sender: {
        firstname: senderData.firstName,
        lastname: senderData.lastName,
        middlename: senderData.middleName,
        phone: senderData.phone,
      },
      receiverPointId: toCity.id,
      receiverAddress: {
        street: deliveryData.street,
        house: deliveryData.houseNumber,
        apartment: deliveryData.apartmentNumber,
        comment: deliveryData.note,
        isNonContact: deliveryData.leaveAtDoor,
      },
      receiver: {
        firstname: recipientData.firstName,
        lastname: recipientData.lastName,
        middlename: recipientData.middleName,
        phone: recipientData.phone,
      },
      payer: paymentData.value,
    };

    // console.log(data);

    // postDeliveryOrder(data).then((res) => {
    //   setDeliveryOrder(res);
    //   // console.log(deliveryOrder);
    //   navigate(PATHS.CHECKOUT_SENDING);
    // });

    setDeliveryOrder(data);
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
              {receptionData.street} {receptionData.houseNumber}
              {receptionData.apartmentNumber
                ? `, ${receptionData.apartmentNumber}`
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
              {deliveryData.street} {deliveryData.houseNumber}
              {deliveryData.apartmentNumber
                ? `, ${deliveryData.apartmentNumber}`
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
