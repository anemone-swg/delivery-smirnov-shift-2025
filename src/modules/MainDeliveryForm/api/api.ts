import { baseApi } from "@/api/rtkApi";
import type {
  DeliveryCalcRequest,
  DeliveryOption,
  Package,
  Point,
} from "@/types/delivery";

const mockDeliveryOptions: DeliveryOption[] = [
  {
    id: "opt1",
    price: 500,
    days: 2,
    name: "Экспресс-доставка",
    type: "EXPRESS",
  },
  {
    id: "opt2",
    price: 300,
    days: 5,
    name: "Стандартная доставка",
    type: "DEFAULT",
  },
];

const mainDeliveryFormApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getDeliveryPoints: create.query<Point[], void>({
      query: () => "/deliveryPoints",
    }),
    getDeliveryPackageTypes: create.query<Package[], void>({
      query: () => "/packageTypes",
    }),
    // postDeliveryCalc: create.mutation<
    //   DeliveryOption[] | undefined,
    //   DeliveryCalcRequest
    // >({
    //   query: (data) => ({
    //     url: "/deliveryCalc",
    //     method: "POST",
    //     body: data,
    //   }),
    //   transformResponse: (response: DeliveryCalcResponse) => response.options,
    // }),
    postDeliveryCalc: create.mutation<DeliveryOption[], DeliveryCalcRequest>({
      queryFn: async () => {
        return { data: mockDeliveryOptions };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDeliveryPointsQuery,
  useGetDeliveryPackageTypesQuery,
  usePostDeliveryCalcMutation,
} = mainDeliveryFormApi;
