/**Описание упаковки посылки*/
export interface Package {
  /**Уникальный идентификатор посылки*/
  id: string;
  /** Название типа упаковки (например, "Маленькая коробка") */
  name: string;
  /** Длина упаковки в сантиметрах */
  length: number;
  /** Ширина упаковки в сантиметрах */
  width: number;
  /** Высота упаковки в сантиметрах */
  height: number;
  /** Вес упаковки в килограммах */
  weight: number;
}

/**Описание города*/
export interface City {
  /**Уникальный идентификатор города*/
  id: string;
  /**Название города*/
  name: string;
}

/**Расширенное описание города*/
export interface Point {
  /**Уникальный идентификатор города*/
  id: string;
  /**Название города*/
  name: string;
  /**Широта*/
  latitude: number;
  /**Долгота*/
  longitude: number;
}

/**Вид доставки посылки
 * - `"DEFAULT"` — стандартная доставка
 * - `"EXPRESS"` — экспресс-доставка*/
export type OptionType = "DEFAULT" | "EXPRESS";

/**Человек, который будет платить за доставку
 * - `"RECEIVER"` — получатель
 * - `"SENDER"` — отправитель*/
export type PayerType = "RECEIVER" | "SENDER";

/**Адрес доставки */
export interface Address {
  /**Улица */
  street: string;
  /**Номер дома */
  house: string;
  /**Номер квартиры */
  apartment: string;
  /**Комментарий для курьера */
  comment: string;
}

/**Адрес получателя*/
export interface ReceiverAddress extends Address {
  /**Бесконтактная доставка */
  isNonContact: boolean;
}

/**Данные об отправителе/получателе*/
export interface Person {
  /**Имя */
  firstName: string;
  /**Фамилия */
  lastName: string;
  /**Отчество */
  middleName: string;
  /**Телефон в формате +7XXXXXXXXXX */
  phone: string;
}

/**Данные об плательщике */
export interface Payment {
  /**Тип плательщика */
  value: PayerType;
  /**Флаг, указывающий, завершен ли данный этап формы */
  isCompleted: boolean;
}

/**Опция доставки (одна из возможных) */
export interface DeliveryOption {
  /**Уникальный идентификатор опции доставки */
  id: string;
  /**Стоимость доставки в рублях */
  price: number;
  /**Срок доставки в рабочих днях */
  days: number;
  /**Название опции*/
  name: string;
  /**Тип опции — стандартная или экспресс */
  type: OptionType;
}

/**Список доступных опций доставки */
export type DeliveryOptions = DeliveryOption[];

/**Запрос с API на создание заказа*/
export interface DeliveryOrderRequest {
  /**ID выбранной посылки */
  packageId: string;
  /**Тип доставки или null, если не выбран */
  optionType: OptionType | null;
  /**ID точки отправления */
  senderPointId: string;
  /**Адрес отправителя */
  senderAddress: Address;
  /**Данные об отправителе */
  sender: Person;
  /**ID точки получения */
  receiverPointId: string;
  /**Адрес получателя */
  receiverAddress: ReceiverAddress;
  /**Данные о получателе */
  receiver: Person;
  /**Кто оплачивает доставку*/
  payer: PayerType;
}

/**Запрос с API на расчет опций доставки*/
export interface DeliveryCalcRequest {
  /**Параметры посылки */
  package: {
    /**Длина в сантиметрах */
    length: number;
    /**Ширина в сантиметрах */
    width: number;
    /**Высота в сантиметрах */
    height: number;
    /**Вес в граммах */
    weight: number;
  };

  /**Координаты точки отправления */
  senderPoint: {
    /**Широта */
    latitude: number;
    /**Долгота */
    longitude: number;
  };

  /**Координаты точки получения */
  receiverPoint: {
    /**Широта */
    latitude: number;
    /**Долгота */
    longitude: number;
  };
}
