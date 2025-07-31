export interface Package {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface City {
  id: string;
  name: string;
}

export interface Point {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export type OptionType = "DEFAULT" | "EXPRESS";
export type PayerType = "RECEIVER" | "SENDER";

export interface Address {
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

export interface ReceiverAddress extends Address {
  isNonContact: boolean;
}

export interface Person {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
}

export interface Payment {
  value: PayerType;
  isCompleted: boolean;
}

export interface DeliveryOption {
  id: string;
  price: number;
  days: number;
  name: string;
  type: OptionType;
}

export type DeliveryOptions = DeliveryOption[];

export interface DeliveryOrderRequest {
  packageId: string;
  optionType: OptionType;
  senderPointId: string;
  senderAddress: Address;
  sender: Person;
  receiverPointId: string;
  receiverAddress: ReceiverAddress;
  receiver: Person;
  payer: PayerType;
}

export interface DeliveryCalcRequest {
  package: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  senderPoint: {
    latitude: number;
    longitude: number;
  };
  receiverPoint: {
    latitude: number;
    longitude: number;
  };
}
