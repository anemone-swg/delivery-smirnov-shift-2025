import axiosInstance from "@/api/axiosInstance.js";

export const postDeliveryCalc = async (data) => {
  const response = await axiosInstance.post(`/api/delivery/calc`, data);
  return response.data;
};
