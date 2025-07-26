import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

type OptionType = "DEFAULT" | "EXPRESS";

interface Option {
  id: string;
  price: number;
  days: number;
  name: string;
  type: OptionType;
}

interface DeliveryCalcResponse {
  success: boolean;
  reason?: string;
  options?: Option[];
}

interface DeliveryCalcBody {
  package: {
    length: number;
    width: number;
    weight: number;
    height: number;
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

export const postDeliveryCalc = async (data: DeliveryCalcBody) => {
  const response: AxiosResponse<DeliveryCalcResponse> =
    await axiosInstance.post(`/api/delivery/calc`, data);
  return response.data.options;
};
