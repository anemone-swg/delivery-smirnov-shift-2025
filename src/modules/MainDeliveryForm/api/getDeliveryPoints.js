import axiosInstance from "@/api/axiosInstance.js";

export const getDeliveryPoints = async () => {
  const response = await axiosInstance.get(`/api/delivery/points`);
  return response.data?.points;
};
