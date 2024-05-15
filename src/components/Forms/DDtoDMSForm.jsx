import React, { useState, useContext } from 'react';
import { SiConvertio } from "react-icons/si";
import { MapContext } from '../Maps/MapContext';

/**
 * DDtoDMSForm component that provides a form to convert DD to DMS and add the result to the map.
 * 
 * @returns {JSX.Element} The rendered DDtoDMSForm component.
 */
const DDtoDMSForm = () => {
  const [latitudeDD, setLatitudeDD] = useState('');
  const [longitudeDD, setLongitudeDD] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { addMarker } = useContext(MapContext);

  const isValidDD = (dd) => {
    const value = parseFloat(dd);
    return !isNaN(value) && Math.abs(value) <= 180;
  };

  const convertDDtoDMS = (dd) => {
    const absolute = Math.abs(dd);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    return `${degrees}° ${minutes}′ ${seconds}″`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidDD(latitudeDD) || !isValidDD(longitudeDD)) {
      setError('Invalid DD format. Latitude must be between -90 and 90, and Longitude must be between -180 and 180.');
      return;
    }
    setError('');
    const latitudeDMS = convertDDtoDMS(parseFloat(latitudeDD)) + (latitudeDD >= 0 ? ' N' : ' S');
    const longitudeDMS = convertDDtoDMS(parseFloat(longitudeDD)) + (longitudeDD >= 0 ? ' E' : ' W');
    setResult({
      latitude: latitudeDMS,
      longitude: longitudeDMS
    });
  };

  const handleAddToMap = () => {
    if (result) {
      addMarker([parseFloat(longitudeDD), parseFloat(latitudeDD)]);
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
            <p className='text-sm font-bold'>Decimal Degrees (DD) to Degrees, Minutes, and Seconds (DMS) Converter</p>
          </div>
        </div>
        <div>
          <p className='text-xs'>This tool permits the user to convert latitude and longitude between decimal degrees (DD) and degrees, minutes, and seconds (DMS).</p>
        </div>
      </div>
      <form className="space-y-4 my-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-white">Latitude (DD)</label>
          <input
            type="text"
            value={latitudeDD}
            onChange={(e) => setLatitudeDD(e.target.value)}
            placeholder="e.g. 34.567"
            className="mt-2 block w-full px-4 py-2 bg-black border border-gray-700 rounded-full ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition duration-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Longitude (DD)</label>
          <input
            type="text"
            value={longitudeDD}
            onChange={(e) => setLongitudeDD(e.target.value)}
            placeholder="e.g. -123.456"
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

export default DDtoDMSForm;
