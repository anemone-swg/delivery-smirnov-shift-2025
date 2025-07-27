import axiosInstance from "@/api/axiosInstance";
import { AxiosResponse } from "axios";
import type { Package } from "@/types/delivery";

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
