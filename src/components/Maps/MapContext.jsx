import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState([]);

  const addMarker = (coord) => {
    setCoordinates([...coordinates, coord]);
  };

  return (
    <MapContext.Provider value={{ coordinates, addMarker }}>
      {children}
    </MapContext.Provider>
  );
};
