import axiosInstance from "@/api/axiosInstance.js";

export const postDeliveryOrder = async (data) => {
  const response = await axiosInstance.post(`/api/delivery/order`, data);
  return response.data?.order;
};
