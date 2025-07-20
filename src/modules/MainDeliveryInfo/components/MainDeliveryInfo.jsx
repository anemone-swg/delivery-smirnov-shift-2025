import React from "react";
import styles from "./MainDeliveyInfo.module.scss";
import blueBox from "@/assets/blue_box.jpg";
import qrCode from "@/assets/qr_delivery_info.jpg";
import mainBox from "@/assets/main_box.jpg";
import { useMediaQuery } from "react-responsive";

const MainDeliveryInfo = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={styles.deliveryInfo}>
      {isMobile ? (
        <>
          <h1 className={styles.deliveryInfo__title}>Мы доставим ваш заказ</h1>
          <p className={styles.deliveryInfo__text}>
            Отправляйте посылки в приложении Шифт Delivery
          </p>
        </>
      ) : (
        <>
          <div className={styles.deliveryInfo__leftSide}>
            <h1 className={styles.deliveryInfo__title}>
              Мы доставим ваш заказ
            </h1>
            <p className={styles.deliveryInfo__text}>
              Отправляйте посылки в приложении Шифт Delivery
            </p>
            <div className={styles.deliveryInfo__QRCodePlace}>
              <img src={blueBox} alt="blueBox" />
              <img src={qrCode} alt="qrCode" />
              <span>Наведите камеру телефона на QR-код</span>
            </div>
          </div>
          <div className={styles.deliveryInfo__boxImage}>
            <img src={mainBox} alt="mainBox" />
          </div>
        </>
      )}
    </div>
  );
};

export default MainDeliveryInfo;
