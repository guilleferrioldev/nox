"use client"

import { createContext, useState, useContext } from 'react';

const DetailsContext = createContext({
  isDetails: false,
  toggleDetails: () => {} 
})

const DetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDetails, setIsDetails] = useState(false);

  const toggleDetails = () => {
    setIsDetails(!isDetails);
  };

  return (
    <DetailsContext.Provider value={{ isDetails, toggleDetails }}>
      {children}
    </DetailsContext.Provider>
  );
};

const useDetails = () => {
  const context = useContext(DetailsContext);
  if (!context) {
    throw new Error('useDetails debe usarse dentro de un DetailsProvider');
  }
  return context;
};

export { DetailsProvider, useDetails };

