import axiosInstance from "@/api/axiosInstance.js";

export const fetchCitiesPoints = async () => {
  const response = await axiosInstance.get(`/api/delivery/points`);
  return response.data?.points;
};
