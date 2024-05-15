import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DMStoDDForm from '../Forms/DMStoDDForm';
import { MapContext } from '../Maps/MapContext';

describe('DMStoDDForm', () => {
  const mockAddMarker = jest.fn();

  const renderComponent = () => {
    return render(
      <MapContext.Provider value={{ addMarker: mockAddMarker }}>
        <DMStoDDForm />
      </MapContext.Provider>
    );
  };

  test('converts DMS to DD and displays the result', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 123 34 45 N');
    const longitudeInput = screen.getByPlaceholderText('e.g. 45 23 12 E');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: '34 30 30 N' } });
    fireEvent.change(longitudeInput, { target: { value: '45 15 15 E' } });
    fireEvent.click(convertButton);

    expect(screen.getByText(/Latitude: 34.508333/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude: 45.254167/i)).toBeInTheDocument();
  });

  test('adds coordinates to the map', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 123 34 45 N');
    const longitudeInput = screen.getByPlaceholderText('e.g. 45 23 12 E');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: '34 30 30 N' } });
    fireEvent.change(longitudeInput, { target: { value: '45 15 15 E' } });
    fireEvent.click(convertButton);

    const addToMapButton = screen.getByText('Add to Map');
    fireEvent.click(addToMapButton);

    expect(mockAddMarker).toHaveBeenCalledWith([45.254167, 34.508333]);
  });

  test('shows error message for invalid DMS input', () => {
    renderComponent();

    const latitudeInput = screen.getByPlaceholderText('e.g. 123 34 45 N');
    const longitudeInput = screen.getByPlaceholderText('e.g. 45 23 12 E');
    const convertButton = screen.getByText('Convert');

    fireEvent.change(latitudeInput, { target: { value: 'invalid input' } });
    fireEvent.change(longitudeInput, { target: { value: 'invalid input' } });
    fireEvent.click(convertButton);

    expect(screen.queryByText(/Latitude:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Longitude:/i)).not.toBeInTheDocument();
  });
});
