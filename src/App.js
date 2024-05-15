import React from 'react';
import MapComponent from './components/Maps/Map';
import ToggleButton from './components/Toggle-Button/ToggleButton';
import './App.css';
import Header from './components/Header/Header';
import { MapProvider } from './components/Maps/MapContext'; 

/**
 * The main App component that sets up the application structure.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  return (
    <MapProvider>
      <div>
        <div className='w-full h-screen'>
          <div className="static bg-gray-950 navbar w-full">
            <Header/>
          </div>
          <div className="relative w-full h-[90%] bg-white p-6 rounded-xl">
            <MapComponent />
            <div className='absolute top-6 right-6'>
              <ToggleButton/>
            </div>
          </div>
        </div>
      </div>
    </MapProvider>
  );
};

export default App;
