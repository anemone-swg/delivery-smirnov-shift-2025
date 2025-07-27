import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import type { DeliveryCalcRequest } from "@/types/delivery";

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

export const postDeliveryCalc = async (data: DeliveryCalcRequest) => {
  const response: AxiosResponse<DeliveryCalcResponse> =
    await axiosInstance.post(`/api/delivery/calc`, data);
  return response.data.options;
};
