import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

interface Point {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

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
