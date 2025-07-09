import React, { createContext, useContext, useState } from "react";

const DeliveryContext = createContext(undefined);

export const DeliveryProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <DeliveryContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext);
