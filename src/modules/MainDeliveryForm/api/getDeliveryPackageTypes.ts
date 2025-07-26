import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";

interface Package {
  id: string;
  name: string;
  length: number;
  width: number;
  weight: number;
  height: number;
}

interface PackageTypeResponse {
  success: boolean;
  reason?: string;
  packages?: Package[];
}

export const getDeliveryPackageTypes = async () => {
  const response: AxiosResponse<PackageTypeResponse> = await axiosInstance.get(
    `/api/delivery/package/types`,
  );
  return response.data?.packages;
};
