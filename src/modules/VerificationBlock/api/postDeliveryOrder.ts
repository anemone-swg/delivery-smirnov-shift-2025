import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import type {
  Address,
  DeliveryOrderRequest,
  OptionType,
  Package,
  PayerType,
  Person,
  Point,
  ReceiverAddress
} from "@/types/delivery";

/**
 * Возможные статусы доставки:
 * - 0: создан
 * - 1: ожидает отправки
 * - 2: в пути
 * - 3: доставлен
 * - 4: отменён
 */
type Status = 0 | 1 | 2 | 3 | 4;

/**
 * Ответ от сервера на создание заказа доставки.
 */
interface DeliveryOrderResponse {
  /** Флаг успеха запроса */
  success: boolean;
  /** Причина ошибки, если `success === false` */
  reason?: string;
  /** Объект созданного заказа */
  order?: {
    /**Уникальный идентификатор заказа*/
    _id: string;
    /**Цена доставки в рублях*/
    price: number;
    package: Package;
    option: OptionType;
    senderPoint: Point;
    senderAddress: Address;
    sender: Person;
    receiverPoint: Point;
    receiverAddress: ReceiverAddress;
    receiver: Person;
    payer: PayerType;
    status: Status;
    /** Можно ли отменить заказ */
    cancellable: boolean;
  };
}

/**
 * Отправляет запрос на создание заказа доставки.
 * @param data Данные для осуществления заказа
 * @returns Объект созданного заказа (если успешно)
 */
export const postDeliveryOrder = async (data: DeliveryOrderRequest) => {
  const response: AxiosResponse<DeliveryOrderResponse> =
    await axiosInstance.post(`/api/delivery/order`, data);
  return response.data?.order;
};
