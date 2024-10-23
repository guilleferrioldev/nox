"use client"

import { MarkerLocation } from '@/types';
import React, { createContext, useContext, useState } from 'react';

interface LocationContextType {
    location: MarkerLocation | null;
    setLocation: (location: MarkerLocation) => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<MarkerLocation | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
      throw new Error('useDetails debe usarse dentro de un DetailsProvider');
    }
    return context;
  };

export { LocationProvider , useLocation};