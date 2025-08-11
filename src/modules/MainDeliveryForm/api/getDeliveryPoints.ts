import type { Point } from "@/types/delivery";

// interface DeliveryPointResponse {
//   success: boolean;
//   reason?: string;
//   points?: Point[];
// }

// export const getDeliveryPoints = async () => {
//   const response: AxiosResponse<DeliveryPointResponse> =
//     await axiosInstance.get(`/api/delivery/points`);
//   return response.data?.points;
// };

const mockPoints: Point[] = [
  {
    id: "1",
    name: "Москва",
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    id: "2",
    name: "Санкт-Петербург",
    latitude: 59.9343,
    longitude: 30.3351,
  },
  {
    id: "3",
    name: "Новосибирск",
    latitude: 55.0084,
    longitude: 82.9357,
  },
];

export const getDeliveryPoints = async (): Promise<Point[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPoints);
    }, 300);
  });
};
