import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import { DeliveryCalcRequest, DeliveryOptions } from "@/types/delivery";

interface DeliveryCalcResponse {
  success: boolean;
  reason?: string;
  options?: DeliveryOptions;
}

export const postDeliveryCalc = async (data: DeliveryCalcRequest) => {
  const response: AxiosResponse<DeliveryCalcResponse> =
    await axiosInstance.post(`/api/delivery/calc`, data);
  return response.data.options;
};
