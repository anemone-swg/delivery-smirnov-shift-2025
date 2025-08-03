import {
  DeliveryCalcRequest,
  DeliveryOptions,
  OptionType,
} from "@/types/delivery";

// interface DeliveryCalcResponse {
//   success: boolean;
//   reason?: string;
//   options?: DeliveryOptions;
// }

const mockDeliveryOptions: DeliveryOptions = [
  {
    id: "opt1",
    price: 500,
    days: 2,
    name: "Экспресс-доставка",
    type: "EXPRESS" as OptionType,
  },
  {
    id: "opt2",
    price: 300,
    days: 5,
    name: "Стандартная доставка",
    type: "DEFAULT" as OptionType,
  },
];

export const postDeliveryCalc = async (
  data: DeliveryCalcRequest,
): Promise<DeliveryOptions | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDeliveryOptions);
    }, 300);
  });
};

// export const postDeliveryCalc = async (data: DeliveryCalcRequest) => {
//   const response: AxiosResponse<DeliveryCalcResponse> =
//     await axiosInstance.post(`/api/delivery/calc`, data);
//   return response.data.options;
// };
