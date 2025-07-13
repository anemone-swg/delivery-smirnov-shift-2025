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
    setPaymentData("sender");
    setIsConfirmed(false);
  };

  const initialData = loadData() || {
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
    paymentData: "sender",
    isConfirmed: false,
  };

  const [deliveryForm, setDeliveryForm] = useState(initialData.deliveryForm);
  const [selectedOption, setSelectedOption] = useState(
    initialData.selectedOption,
  );
  const [recipientData, setRecipientData] = useState(initialData.recipientData);
  const [senderData, setSenderData] = useState(initialData.senderData);
  const [receptionData, setReceptionData] = useState(initialData.receptionData);
  const [deliveryData, setDeliveryData] = useState(initialData.deliveryData);
  const [paymentData, setPaymentData] = useState(initialData.paymentData);
  const [isConfirmed, setIsConfirmed] = useState(initialData.isConfirmed);

  useEffect(() => {
    const dataToStore = {
      deliveryForm,
      selectedOption,
      recipientData,
      senderData,
      receptionData,
      deliveryData,
      paymentData,
      isConfirmed,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn("Ошибка сохранения данных в localStorage", error);
    }
  }, [
    deliveryForm,
    selectedOption,
    recipientData,
    senderData,
    receptionData,
    deliveryData,
    paymentData,
    isConfirmed,
  ]);

  return (
    <DeliveryContext.Provider
      value={{
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
        isConfirmed,
        setIsConfirmed,
        resetDeliveryData,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext);
