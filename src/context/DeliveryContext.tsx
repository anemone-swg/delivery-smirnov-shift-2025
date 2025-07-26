import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "deliveryData";

type OptionType = "DEFAULT" | "EXPRESS";
export type PayerType = "RECEIVER" | "SENDER";

interface PersonData {
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
}

interface Address {
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  note: string;
}

interface DeliveryAddress extends Address {
  leaveAtDoor: boolean;
}

interface PaymentData {
  value: PayerType;
  isCompleted: boolean;
}

interface PackageType {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

interface City {
  id: string;
  name: string;
}

type DeliveryOptions = DeliveryOption[];

export interface DeliveryOption {
  id: string;
  price: number;
  days: number;
  name: string;
  type: OptionType;
}

interface DeliveryContextType {
  packageType: PackageType | null;
  setPackageType: Dispatch<SetStateAction<PackageType | null>>;
  fromCity: City | null;
  setFromCity: Dispatch<SetStateAction<City | null>>;
  toCity: City | null;
  setToCity: Dispatch<SetStateAction<City | null>>;
  deliveryForm: DeliveryOptions | null;
  setDeliveryForm: Dispatch<SetStateAction<DeliveryOptions | null>>;
  selectedOption: DeliveryOption | null;
  setSelectedOption: Dispatch<SetStateAction<DeliveryOption | null>>;
  recipientData: PersonData;
  setRecipientData: Dispatch<SetStateAction<PersonData>>;
  senderData: PersonData;
  setSenderData: Dispatch<SetStateAction<PersonData>>;
  receptionData: Address;
  setReceptionData: Dispatch<SetStateAction<Address>>;
  deliveryData: DeliveryAddress;
  setDeliveryData: Dispatch<SetStateAction<DeliveryAddress>>;
  paymentData: PaymentData;
  setPaymentData: Dispatch<SetStateAction<PaymentData>>;
  deliveryOrder: Record<string, unknown> | null;
  setDeliveryOrder: Dispatch<SetStateAction<Record<string, unknown> | null>>;
  resetDeliveryData: () => void;
}

interface InitialDeliveryData {
  packageType: PackageType | null;
  fromCity: City | null;
  toCity: City | null;
  deliveryForm: DeliveryOptions | null;
  selectedOption: DeliveryOption | null;
  recipientData: PersonData;
  senderData: PersonData;
  receptionData: Address;
  deliveryData: DeliveryAddress;
  paymentData: PaymentData;
  deliveryOrder: unknown;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined,
);

interface DeliveryProviderProps {
  children: ReactNode;
}

export const DeliveryProvider = ({ children }: DeliveryProviderProps) => {
  const loadData = (): InitialDeliveryData | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    return null;
  };

  const resetDeliveryData = () => {
    setPackageType(null);
    setFromCity(null);
    setToCity(null);
    setDeliveryForm(null);
    setSelectedOption(null);
    setRecipientData({
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
    });
    setSenderData({ lastName: "", firstName: "", middleName: "", phone: "" });
    setReceptionData({
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      note: "",
    });
    setDeliveryData({
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      note: "",
      leaveAtDoor: false,
    });
    setPaymentData({
      value: "SENDER",
      isCompleted: false,
    });
    setDeliveryOrder(null);
  };

  const initialData: InitialDeliveryData = loadData() || {
    packageType: null,
    fromCity: null,
    toCity: null,
    deliveryForm: null,
    selectedOption: null,
    recipientData: {
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
    },
    senderData: {
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
    },
    receptionData: {
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      note: "",
    },
    deliveryData: {
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      note: "",
      leaveAtDoor: false,
    },
    paymentData: {
      value: "SENDER",
      isCompleted: false,
    },
    deliveryOrder: null,
  };

  const [packageType, setPackageType] = useState<PackageType | null>(
    initialData.packageType,
  );
  const [fromCity, setFromCity] = useState<City | null>(initialData.fromCity);
  const [toCity, setToCity] = useState<City | null>(initialData.toCity);
  const [deliveryForm, setDeliveryForm] = useState<DeliveryOptions | null>(
    initialData.deliveryForm,
  );
  const [selectedOption, setSelectedOption] = useState<DeliveryOption | null>(
    initialData.selectedOption,
  );
  const [recipientData, setRecipientData] = useState<PersonData>(
    initialData.recipientData,
  );
  const [senderData, setSenderData] = useState<PersonData>(
    initialData.senderData,
  );
  const [receptionData, setReceptionData] = useState<Address>(
    initialData.receptionData,
  );
  const [deliveryData, setDeliveryData] = useState<DeliveryAddress>(
    initialData.deliveryData,
  );
  const [paymentData, setPaymentData] = useState<PaymentData>(
    initialData.paymentData,
  );
  const [deliveryOrder, setDeliveryOrder] = useState<Record<
    string,
    unknown
  > | null>(initialData.deliveryOrder as Record<string, unknown> | null);

  useEffect(() => {
    const dataToStore = {
      packageType,
      fromCity,
      toCity,
      deliveryForm,
      selectedOption,
      recipientData,
      senderData,
      receptionData,
      deliveryData,
      paymentData,
      deliveryOrder,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn("Ошибка сохранения данных в localStorage", error);
    }
  }, [
    packageType,
    fromCity,
    toCity,
    deliveryForm,
    selectedOption,
    recipientData,
    senderData,
    receptionData,
    deliveryData,
    paymentData,
    deliveryOrder,
  ]);

  return (
    <DeliveryContext.Provider
      value={{
        packageType,
        setPackageType,
        fromCity,
        setFromCity,
        toCity,
        setToCity,
        deliveryForm,
        setDeliveryForm,
        selectedOption,
        setSelectedOption,
        recipientData,
        setRecipientData,
        senderData,
        setSenderData,
        receptionData,
        setReceptionData,
        deliveryData,
        setDeliveryData,
        paymentData,
        setPaymentData,
        deliveryOrder,
        setDeliveryOrder,
        resetDeliveryData,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = (): DeliveryContextType => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
};
