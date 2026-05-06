import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import { calculateTax } from '../taxCalculator';

vi.mock('../taxCalculator', () => ({
  calculateTax: vi.fn(),
}));

const defaultProps = {
  alcoholTypes: ['Malt', 'Wine', 'Beer', 'Spirits'],
  allLiquidMeasurements: ['12 Ounces', 'Pint', 'Case'],
  specificLiquidMeasurements: ['250ml', '750ml', '1L', '1.75L'],
  proofOptions: [80, 90, 100, 120]
};

describe('AlcoholTaxCalculator - Button State', () => {
  beforeEach(() => {
    calculateTax.mockClear();
  });

  test('should render the button as disabled initially', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeDisabled();
  });

  test('should enable the button when alcohol type and liquid measurement are selected', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt' }));
    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeEnabled();
  });

  test('should enable the button when alcohol type is Spirits, liquid measurement is selected, and proof is selected', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));
    fireEvent.click(screen.getByRole('button', { name: '100' }));

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeEnabled();
  });

  test('should keep the button disabled if proof is not selected when alcohol type is Spirits', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeDisabled();
  });

  test('should keep the button disabled if liquid measurement is not selected', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeDisabled();
  });

  test('should keep the button disabled if alcohol type is not selected', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));

    const button = screen.getByRole('button', { name: 'Calculate Tax' });
    expect(button).toBeDisabled();
  });

});

describe('AlcoholTaxCalculator', () => {
  beforeEach(() => {
    calculateTax.mockClear();
  });

  test('renders without crashing', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    expect(screen.getByText('State: Massachusetts')).toBeInTheDocument();
  });

  test('calculates tax correctly for Spirits with proof', () => {
    calculateTax.mockReturnValue('50.00');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));
    fireEvent.click(screen.getByRole('button', { name: '100' }));

    fireEvent.click(screen.getByRole('button', { name: 'Calculate Tax' }));

    expect(calculateTax).toHaveBeenCalledWith('MA', 'Spirits', '750ml', 100);
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Spirits - 750ml - 100 proof')).toBeInTheDocument();
  });

  test('clears the displayed tax when a selected input changes', () => {
    calculateTax.mockReturnValue('0.01');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt' }));
    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));
    fireEvent.click(screen.getByRole('button', { name: 'Calculate Tax' }));

    expect(screen.getByText('$0.01')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pint' }));

    expect(screen.queryByText('$0.01')).not.toBeInTheDocument();
  });

  test('resets measurement and proof when alcohol type changes', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));
    fireEvent.click(screen.getByRole('button', { name: '100' }));

    expect(screen.getByRole('button', { name: 'Calculate Tax' })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: 'Malt' }));

    expect(screen.getByRole('button', { name: 'Calculate Tax' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: '100' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '12 Ounces' })).toHaveAttribute('aria-pressed', 'false');
  });
});
