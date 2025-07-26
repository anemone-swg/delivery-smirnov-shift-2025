import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

type DeliveryOption = "DEFAULT" | "EXPRESS";
type Payer = "RECEIVER" | "SENDER";
type Status = 0 | 1 | 2 | 3 | 4;

interface Address {
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

interface ReceiverAddress extends Address {
  isNonContact: boolean;
}

interface Person {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
}

interface Point {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Package {
  id: string;
  name: string;
  length: number;
  width: number;
  weight: number;
  height: number;
}

interface DeliveryOrderBody {
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

interface DeliveryOrderResponse {
  success: boolean;
  reason?: string;
  order?: {
    _id: string;
    price: number;
    package: Package;
    option: DeliveryOption;
    senderPoint: Point;
    senderAddress: Address;
    sender: Person;
    receiverPoint: Point;
    receiverAddress: ReceiverAddress;
    receiver: Person;
    payer: Payer;
    status: Status;
    cancellable: boolean;
  };
}

export const postDeliveryOrder = async (data: DeliveryOrderBody) => {
  const response: AxiosResponse<DeliveryOrderResponse> =
    await axiosInstance.post(`/api/delivery/order`, data);
  return response.data?.order;
};
