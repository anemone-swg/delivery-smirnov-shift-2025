import axiosInstance from "@/api/axiosInstance.js";

export const calcDelivery = async (data) => {
  const response = await axiosInstance.post(`/api/delivery/calc`, data);
  console.log(response.data);
  return response.data;
};
