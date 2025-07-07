import axiosInstance from "@/api/axiosInstance.js";

export const fetchPackageSizes = async () => {
  const response = await axiosInstance.get(`/api/delivery/package/types`);
  return response.data?.packages;
};
