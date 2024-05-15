import React, { useState } from 'react';
import DMStoDDForm from './DMStoDDForm';
import DDtoDMSForm from './DDtoDMSForm';

const ConversionForm = () => {
  const [activeTab, setActiveTab] = useState('DMS to DD');

  return (
    <div className="p-4 bg-gray-900 h-screen text-white">
      <div className='flex justify-center mb-4'>
        <button
          className={`px-4 py-2 transition-colors duration-300 font-bold ${activeTab === 'DMS to DD' ? 'border-b-4 border-emerald-500' : 'border-b-4 border-transparent'}`}
          onClick={() => setActiveTab('DMS to DD')}
        >
          DMS to DD
        </button>
        <button
          className={`px-4 py-2 transition-colors duration-300 font-bold ${activeTab === 'DD to DMS' ? 'border-b-4 border-emerald-500' : 'border-b-4 border-transparent'}`}
          onClick={() => setActiveTab('DD to DMS')}
        >
          DD to DMS
        </button>
      </div>
      <div className="transition-opacity duration-300">
        {activeTab === 'DMS to DD' ? <DMStoDDForm /> : <DDtoDMSForm />}
      </div>
    </div>
  );
};

export default ConversionForm;
