import React, { createContext, useContext, useEffect, useState } from "react";

const DeliveryContext = createContext(undefined);

const STORAGE_KEY = "deliveryData";

export const DeliveryProvider = ({ children }) => {
  const loadData = () => {
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
    setPaymentData("SENDER");
    setDeliveryOrder(null);
  };

  const initialData = loadData() || {
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
    paymentData: "SENDER",
    deliveryOrder: "",
  };

  const [packageType, setPackageType] = useState(initialData.packageType);
  const [fromCity, setFromCity] = useState(initialData.fromCity);
  const [toCity, setToCity] = useState(initialData.toCity);
  const [deliveryForm, setDeliveryForm] = useState(initialData.deliveryForm);
  const [selectedOption, setSelectedOption] = useState(
    initialData.selectedOption,
  );
  const [recipientData, setRecipientData] = useState(initialData.recipientData);
  const [senderData, setSenderData] = useState(initialData.senderData);
  const [receptionData, setReceptionData] = useState(initialData.receptionData);
  const [deliveryData, setDeliveryData] = useState(initialData.deliveryData);
  const [paymentData, setPaymentData] = useState(initialData.paymentData);
  const [deliveryOrder, setDeliveryOrder] = useState(initialData.deliveryOrder);

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

export const useDelivery = () => useContext(DeliveryContext);
