import React from 'react';
import MapComponent from './components/Maps/Map';
import ToggleButton from './components/Toggle-Button/ToggleButton';
import './App.css';
import Header from './components/Header/Header';

const App = () => {

  return (
    <div>
      <div className='w-full h-screen'>
        <div className="static bg-gray-950 navbar w-full">
          <Header/>
        </div>
        <div className="relative w-full h-[91%] bg-white p-6 rounded-xl">
          <MapComponent />
          <div className='absolute top-6 right-6'>
            <ToggleButton/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
