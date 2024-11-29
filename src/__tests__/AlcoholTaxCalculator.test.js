// src/__tests__/AlcoholTaxCalculator.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import { calculateTax } from '../taxCalculator';

// Mock the calculateTax function
jest.mock('../taxCalculator', () => ({
  calculateTax: jest.fn(),
}));

describe('AlcoholTaxCalculator', () => {
  beforeEach(() => {
    calculateTax.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <AlcoholTaxCalculator 
        alcoholTypes={['Malt', 'Wine', 'Beer', 'Spirits']}
        allLiquidMeasurements={['twelve', 'pint', 'case']}
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
        allLiquidMeasurements={['twelve', 'pint', 'case']}
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
        allLiquidMeasurements={['twelve', 'pint', 'case']}
        specificLiquidMeasurements={['250ml', '750ml']}
        proofOptions={[80, 90, 100, 120]}
      />
    );

    fireEvent.click(screen.getByText('Spirits'));  // Select alcohol type

    fireEvent.click(screen.getByText('Calculate Tax')); // Submit form

    expect(screen.getByText('Select Alcohol Type:')).toBeInTheDocument();
  });
});
