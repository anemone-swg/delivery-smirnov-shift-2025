/**
 * Объект с путями для роутинга в приложении.
 * Используется для перехода между страницами и шагами оформления заказа.
 */

const PATHS = {
  MAIN: "/main",
  CHECKOUT_METHOD: "/checkout/method",
  CHECKOUT_RECIPIENT: "/checkout/recipient",
  CHECKOUT_SENDER: "/checkout/sender",
  CHECKOUT_RECEPTION: "/checkout/reception",
  CHECKOUT_DELIVERY: "/checkout/delivery",
  CHECKOUT_PAYMENT: "/checkout/payment",
  CHECKOUT_VERIFICATION: "/checkout/verification",
  CHECKOUT_SENDING: "/checkout/sending",
} as const;

export default PATHS;
