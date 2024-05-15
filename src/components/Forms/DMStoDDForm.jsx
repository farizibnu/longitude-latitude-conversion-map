import React, { useState, useContext } from 'react';
import { SiConvertio } from "react-icons/si";
import { MapContext } from '../Maps/MapContext'; 

const DMStoDDForm = () => {
  const [latitudeDMS, setLatitudeDMS] = useState('');
  const [longitudeDMS, setLongitudeDMS] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { addMarker } = useContext(MapContext);

  const cleanDMSInput = (dms) => {
    return dms.replace(/[^\d\s.]+/g, '').trim();
  };

  const isValidDMS = (dms) => {
    const parts = cleanDMSInput(dms).split(/\s+/);
    if (parts.length !== 3 || parts.some(part => isNaN(part))) {
      return false;
    }
    return true;
  };

  const convertDMStoDD = (dms, direction) => {
    const cleanedDMS = cleanDMSInput(dms);
    const parts = cleanedDMS.split(/\s+/);
    const degrees = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]) / 60;
    const seconds = parseFloat(parts[2]) / 3600;
    let dd = degrees + minutes + seconds;
    if (direction === 'S' || direction === 'W') {
      dd *= -1;
    }
    return dd;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidDMS(latitudeDMS) || !isValidDMS(longitudeDMS)) {
      setError('Invalid DMS format. Please enter in "Degrees Minutes Seconds Direction" format.');
      return;
    }
    setError('');
    const latitudeDD = convertDMStoDD(latitudeDMS, latitudeDMS.slice(-1));
    const longitudeDD = convertDMStoDD(longitudeDMS, longitudeDMS.slice(-1));
    setResult({
      latitude: latitudeDD.toFixed(6),
      longitude: longitudeDD.toFixed(6)
    });
  };

  const formatDMS = (value) => {
    if (!value) return '';
    const parts = value.split(/\s+/);
    return `${parts[0] || ''}° ${parts[1] || ''}′ ${parts[2] || ''}″ ${parts[3] || ''}`;
  };

  const handleBlur = (e, setValue) => {
    setValue(formatDMS(e.target.value));
  };

  const handleAddToMap = () => {
    if (result) {
      addMarker([parseFloat(result.longitude), parseFloat(result.latitude)]);
    }
  };

  return (
    <div>
      <div className='p-3 border-2 border-gray-700 rounded-xl space-y-2'>
        <div className='flex gap-2'>
          <div className='flex justify-center items-center'>
            <SiConvertio className='h-8 w-8 text-emerald-500'/>
          </div>
          <div>
            <p className='text-sm font-bold'>Degrees, Minutes and Seconds (DMS) to Decimal Degrees (DD) Convertor</p>
          </div>
        </div>
        <div>
          <p className='text-xs'>This tool permits the user to convert latitude and longitude between degrees, minutes and seconds (DMS) and decimal degrees (DD).</p>
        </div>
      </div>
      <form className="space-y-4 my-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-white">Latitude (DMS)</label>
          <input
            type="text"
            value={latitudeDMS}
            onChange={(e) => setLatitudeDMS(e.target.value)}
            onBlur={(e) => handleBlur(e, setLatitudeDMS)}
            placeholder="e.g. 123 34 45 N"
            className="mt-2 block w-full px-4 py-2 bg-black border border-gray-700 rounded-full ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition duration-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Longitude (DMS)</label>
          <input
            type="text"
            value={longitudeDMS}
            onChange={(e) => setLongitudeDMS(e.target.value)}
            onBlur={(e) => handleBlur(e, setLongitudeDMS)}
            placeholder="e.g. 45 23 12 E"
            className="mt-2 block w-full px-4 py-2 bg-black border border-gray-700 rounded-full ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition duration-300 outline-none"
          />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 w-full rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-600"
        >
          Convert
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 border-2 border-gray-700 rounded-xl">
          <p className="text-sm font-bold">Result:</p>
          <p className="text-xs">Latitude: {result.latitude}, Longitude: {result.longitude}</p>
          <button
            onClick={handleAddToMap}
            className="mt-2 px-4 py-2 w-full rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-600"
          >
            Add to Map
          </button>
        </div>
      )}
    </div>
  );
};

export default DMStoDDForm;
