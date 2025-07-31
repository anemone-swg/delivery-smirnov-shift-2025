import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  Address,
  City,
  DeliveryOption,
  DeliveryOptions,
  DeliveryOrderRequest,
  Package,
  Payment,
  Person,
  ReceiverAddress,
} from "@/types/delivery";

const STORAGE_KEY = "deliveryData";

interface DeliveryContextType {
  packageType: Package | null;
  setPackageType: Dispatch<SetStateAction<Package | null>>;
  fromCity: City | null;
  setFromCity: Dispatch<SetStateAction<City | null>>;
  toCity: City | null;
  setToCity: Dispatch<SetStateAction<City | null>>;
  deliveryForm: DeliveryOptions | null;
  setDeliveryForm: Dispatch<SetStateAction<DeliveryOptions | null>>;
  selectedOption: DeliveryOption | null;
  setSelectedOption: Dispatch<SetStateAction<DeliveryOption | null>>;
  recipientData: Person;
  setRecipientData: Dispatch<SetStateAction<Person>>;
  senderData: Person;
  setSenderData: Dispatch<SetStateAction<Person>>;
  receptionData: Address;
  setReceptionData: Dispatch<SetStateAction<Address>>;
  deliveryData: ReceiverAddress;
  setDeliveryData: Dispatch<SetStateAction<ReceiverAddress>>;
  paymentData: Payment;
  setPaymentData: Dispatch<SetStateAction<Payment>>;
  deliveryOrder: DeliveryOrderRequest | null;
  setDeliveryOrder: Dispatch<SetStateAction<DeliveryOrderRequest | null>>;
  resetDeliveryData: () => void;
}

interface InitialDeliveryData {
  packageType: Package | null;
  fromCity: City | null;
  toCity: City | null;
  deliveryForm: DeliveryOptions | null;
  selectedOption: DeliveryOption | null;
  recipientData: Person;
  senderData: Person;
  receptionData: Address;
  deliveryData: ReceiverAddress;
  paymentData: Payment;
  deliveryOrder: DeliveryOrderRequest | null;
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
      house: "",
      apartment: "",
      comment: "",
    });
    setDeliveryData({
      street: "",
      house: "",
      apartment: "",
      comment: "",
      isNonContact: false,
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
      house: "",
      apartment: "",
      comment: "",
    },
    deliveryData: {
      street: "",
      house: "",
      apartment: "",
      comment: "",
      isNonContact: false,
    },
    paymentData: {
      value: "SENDER",
      isCompleted: false,
    },
    deliveryOrder: null,
  };

  const [packageType, setPackageType] = useState<Package | null>(
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
  const [recipientData, setRecipientData] = useState<Person>(
    initialData.recipientData,
  );
  const [senderData, setSenderData] = useState<Person>(initialData.senderData);
  const [receptionData, setReceptionData] = useState<Address>(
    initialData.receptionData,
  );
  const [deliveryData, setDeliveryData] = useState<ReceiverAddress>(
    initialData.deliveryData,
  );
  const [paymentData, setPaymentData] = useState<Payment>(
    initialData.paymentData,
  );
  const [deliveryOrder, setDeliveryOrder] =
    useState<DeliveryOrderRequest | null>(initialData.deliveryOrder);

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
