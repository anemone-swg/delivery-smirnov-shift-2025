import type { Package } from "@/types/delivery";

interface PackageTypeResponse {
  success: boolean;
  reason?: string;
  packages?: Package[];
}

// export const getDeliveryPackageTypes = async () => {
//   const response: AxiosResponse<PackageTypeResponse> = await axiosInstance.get(
//     `/api/delivery/package/types`,
//   );
//   return response.data?.packages;
// };

const mockPackages: Package[] = [
  {
    id: "1",
    name: "Маленькая посылка",
    length: 10,
    width: 5,
    height: 3,
    weight: 0.5,
  },
  {
    id: "2",
    name: "Средняя посылка",
    length: 20,
    width: 15,
    height: 10,
    weight: 2,
  },
  {
    id: "3",
    name: "Большая посылка",
    length: 50,
    width: 40,
    height: 30,
    weight: 10,
  },
];

export const getDeliveryPackageTypes = async (): Promise<
  Package[] | undefined
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPackages);
    }, 300); // имитация задержки
  });
};
