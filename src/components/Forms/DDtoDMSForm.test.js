import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DDtoDMSForm from '../Forms/DDtoDMSForm';
import { MapContext } from '../Maps/MapContext';

describe('DDtoDMSForm', () => {
  const mockAddMarker = jest.fn();

  const renderComponent = () => {
    return render(
      <MapContext.Provider value={{ addMarker: mockAddMarker }}>
        <DDtoDMSForm />
      </MapContext.Provider>
    );
  };

  test('converts DD to DMS and displays the result', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 34.567');
    const longitudeInput = screen.getByPlaceholderText('e.g. -123.456');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: '34.508333' } });
    fireEvent.change(longitudeInput, { target: { value: '45.254167' } });
    fireEvent.click(convertButton);

    expect(screen.getByText(/Latitude: 34° 30′ 30.00″ N/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude: 45° 15′ 15.00″ E/i)).toBeInTheDocument();
  });

  test('adds coordinates to the map', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 34.567');
    const longitudeInput = screen.getByPlaceholderText('e.g. -123.456');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: '34.508333' } });
    fireEvent.change(longitudeInput, { target: { value: '45.254167' } });
    fireEvent.click(convertButton);

    const addToMapButton = screen.getByText('Add to Map');
    fireEvent.click(addToMapButton);

    expect(mockAddMarker).toHaveBeenCalledWith([45.254167, 34.508333]);
  });

  test('shows error message for invalid DD input', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 34.567');
    const longitudeInput = screen.getByPlaceholderText('e.g. -123.456');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: 'invalid input' } });
    fireEvent.change(longitudeInput, { target: { value: 'invalid input' } });
    fireEvent.click(convertButton);

    expect(screen.queryByText(/Latitude:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Longitude:/i)).not.toBeInTheDocument();
  });

  test('shows error message for out of range latitude and longitude', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 34.567');
    const longitudeInput = screen.getByPlaceholderText('e.g. -123.456');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: '91' } });  // Invalid latitude
    fireEvent.change(longitudeInput, { target: { value: '181' } });  // Invalid longitude
    fireEvent.click(convertButton);

    expect(screen.getByText(/Invalid DD format/i)).toBeInTheDocument();
  });
});
