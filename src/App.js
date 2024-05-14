import React from 'react';
import MapComponent from './components/Maps/Map';
import ToggleButton from './components/Toggle-Button/ToggleButton';
import './App.css';

const App = () => {

  return (
    <div>
      <div className='flex w-full'>
        <div className="relative w-full h-screen bg-white p-8 rounded-xl">
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
