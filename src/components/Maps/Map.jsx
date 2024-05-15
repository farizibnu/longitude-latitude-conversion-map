import React, { useEffect, useRef, useContext, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MapContext } from './MapContext'; 
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';

const MapComponent = () => {
  const mapElement = useRef();
  const mapRef = useRef();
  const { coordinates } = useContext(MapContext);
  const [mousePosition, setMousePosition] = useState(null);

  const convertDDtoDMS = (dd) => {
    const absolute = Math.abs(dd);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    const direction = dd >= 0 ? 'N' : 'S';
    return `${degrees}° ${minutes}′ ${seconds}″ ${direction}`;
  };

  const convertLonDDtoDMS = (dd) => {
    const absolute = Math.abs(dd);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    const direction = dd >= 0 ? 'E' : 'W';
    return `${degrees}° ${minutes}′ ${seconds}″ ${direction}`;
  };

  useEffect(() => {
    mapRef.current = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    mapRef.current.on('pointermove', (event) => {
      const coords = toLonLat(event.coordinate);
      setMousePosition({
        latitude: coords[1].toFixed(6),
        longitude: coords[0].toFixed(6),
        latitudeDMS: convertDDtoDMS(coords[1]),
        longitudeDMS: convertLonDDtoDMS(coords[0]),
      });
    });

    return () => {
      mapRef.current.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (coordinates.length > 0) {
      const vectorSource = new VectorSource();
      coordinates.forEach((coord) => {
        const iconFeature = new Feature({
          geometry: new Point(fromLonLat(coord)),
        });

        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          }),
        });

        iconFeature.setStyle(iconStyle);
        vectorSource.addFeature(iconFeature);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      mapRef.current.addLayer(vectorLayer);

      const view = mapRef.current.getView();
      view.setCenter(fromLonLat(coordinates[coordinates.length - 1]));
      view.setZoom(10);
    }
  }, [coordinates]);

  return (
    <div className="h-full w-full relative">
      <div ref={mapElement} className="h-full w-full bg-white rounded-2xl overflow-hidden"></div>
      {mousePosition && (
        <div className="absolute bottom-5 left-5 bg-gray-900 text-white p-2 rounded-md">
          <p>Latitude: {mousePosition.latitude} ({mousePosition.latitudeDMS})</p>
          <p>Longitude: {mousePosition.longitude} ({mousePosition.longitudeDMS})</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
