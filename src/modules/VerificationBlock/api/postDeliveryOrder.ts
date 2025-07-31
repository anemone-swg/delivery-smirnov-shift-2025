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
  ReceiverAddress,
} from "@/types/delivery";

type Status = 0 | 1 | 2 | 3 | 4;

interface DeliveryOrderResponse {
  success: boolean;
  reason?: string;
  order?: {
    _id: string;
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
    cancellable: boolean;
  };
}

export const postDeliveryOrder = async (data: DeliveryOrderRequest) => {
  const response: AxiosResponse<DeliveryOrderResponse> =
    await axiosInstance.post(`/api/delivery/order`, data);
  return response.data?.order;
};
