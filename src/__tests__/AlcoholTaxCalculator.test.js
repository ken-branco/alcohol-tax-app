// src/__tests__/AlcoholTaxCalculator.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import { calculateTax } from '../taxCalculator';

// Mock the calculateTax function
jest.mock('../taxCalculator', () => ({
  calculateTax: jest.fn(),
}));
describe('AlcoholTaxCalculator - Button State', () => {
  const alcoholTypes = ['Malt', 'Wine', 'Beer', 'Spirits'];
  const allLiquidMeasurements = ['12 Ounces', 'Pint', 'Case'];
  const specificLiquidMeasurements = ['250ml', '750ml', '1L', '1.75L'];
  const proofOptions = [80, 90, 100, 120];

  test('should render the button as disabled initially', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeDisabled(); // Button should be disabled initially
  });

  test('should enable the button when alcohol type and liquid measurement are selected', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    // Select alcohol type and liquid measurement
    fireEvent.click(screen.getByText('Malt'));  // Select alcohol type
    fireEvent.click(screen.getByText('12 Ounces'));  // Select liquid measurement

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeEnabled(); // Button should be enabled
  });

  test('should enable the button when alcohol type is Spirits, liquid measurement is selected, and proof is selected', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    // Select alcohol type, liquid measurement, and proof
    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type
    fireEvent.click(screen.getByText('750ml'));  // Select liquid measurement
    fireEvent.click(screen.getByText('100'));    // Select proof

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeEnabled(); // Button should be enabled
  });

  test('should keep the button disabled if proof is not selected when alcohol type is Spirits', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    // Select alcohol type and liquid measurement but not proof
    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type
    fireEvent.click(screen.getByText('750ml'));  // Select liquid measurement

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeDisabled(); // Button should still be disabled without proof
  });

  test('should keep the button disabled if liquid measurement is not selected', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    // Select alcohol type but not liquid measurement
    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeDisabled(); // Button should be disabled without liquid measurement
  });

  test('should keep the button disabled if alcohol type is not selected', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={alcoholTypes}
        allLiquidMeasurements={allLiquidMeasurements}
        specificLiquidMeasurements={specificLiquidMeasurements}
        proofOptions={proofOptions}
      />
    );

    // Select liquid measurement but not alcohol type
    fireEvent.click(screen.getByText('12 Ounces'));  // Select liquid measurement

    const button = screen.getByText('Calculate Tax');
    expect(button).toBeDisabled(); // Button should be disabled without alcohol type
  });

});

describe('AlcoholTaxCalculator', () => {
  beforeEach(() => {
    calculateTax.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={['Malt', 'Wine', 'Beer', 'Spirits']}
        allLiquidMeasurements={['12 Ounces', 'Pint', 'Case']}
        specificLiquidMeasurements={['250ml', '750ml']}
        proofOptions={[80, 90, 100, 120]}
      />
    );

    expect(screen.getByText('State: Massachusetts')).toBeInTheDocument();
  });

  test('calculates tax correctly for Spirits with proof', () => {
    calculateTax.mockReturnValue('50.00');

    render(
      <AlcoholTaxCalculator 
        alcoholTypes={['Malt', 'Wine', 'Beer', 'Spirits']}
        allLiquidMeasurements={['12 Ounces', 'Pint', 'Case']}
        specificLiquidMeasurements={['250ml', '750ml']}
        proofOptions={[80, 90, 100, 120]}
      />
    );

    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type
    fireEvent.click(screen.getByText('750ml'));  // Select liquid measurement
    fireEvent.click(screen.getByText('100'));    // Select proof

    fireEvent.click(screen.getByText('Calculate Tax')); // Submit form

    expect(calculateTax).toHaveBeenCalledWith('MA', 'Spirits', '750ml', 100);
    expect(screen.getByText('Tax Paid: $50.00')).toBeInTheDocument();
  });

  test('shows error when required fields are not selected', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={['Malt', 'Wine', 'Beer', 'Spirits']}
        allLiquidMeasurements={['12 Ounces', 'Pint', 'Case']}
        specificLiquidMeasurements={['250ml', '750ml']}
        proofOptions={[80, 90, 100, 120]}
      />
    );

    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type

    fireEvent.click(screen.getByText('Calculate Tax')); // Submit form

    expect(screen.getByText('Select Alcohol Type:')).toBeInTheDocument();
  });
});
