import axiosInstance from "@/api/axiosInstance.js";

export const getDeliveryPackageTypes = async () => {
  const response = await axiosInstance.get(`/api/delivery/package/types`);
  return response.data?.packages;
};
