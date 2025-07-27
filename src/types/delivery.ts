export interface Package {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface Point {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export type DeliveryOption = "DEFAULT" | "EXPRESS";
export type Payer = "RECEIVER" | "SENDER";

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

export interface DeliveryOrderRequest {
  packageId: string;
  optionType: DeliveryOption;
  senderPointId: string;
  senderAddress: Address;
  sender: Person;
  receiverPointId: string;
  receiverAddress: ReceiverAddress;
  receiver: Person;
  payer: Payer;
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
