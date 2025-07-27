import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import type { Point } from "@/types/delivery";

interface DeliveryPointResponse {
  success: boolean;
  reason?: string;
  points?: Point[];
}

export const getDeliveryPoints = async () => {
  const response: AxiosResponse<DeliveryPointResponse> =
    await axiosInstance.get(`/api/delivery/points`);
  return response.data?.points;
};
