import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import { calculateTax } from '../taxCalculator';

vi.mock('../taxCalculator', () => ({
  calculateTax: vi.fn(),
}));

const defaultProps = {
  alcoholTypes: ['Malt/Beer', 'Wine', 'Spirits'],
  allLiquidMeasurements: ['12 Ounces', 'Pint', 'Case'],
  specificLiquidMeasurements: ['250ml', '750ml', '1L', '1.75L'],
  proofOptions: [80, 90, 100, 120]
};

describe('AlcoholTaxCalculator', () => {
  beforeEach(() => {
    calculateTax.mockClear();
  });

  test('renders initial guidance without a calculate button', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    expect(screen.getByText('State: Massachusetts')).toBeInTheDocument();
    expect(screen.getByText('Select an alcohol type to begin.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Calculate Tax' })).not.toBeInTheDocument();
    expect(calculateTax).not.toHaveBeenCalled();
  });

  test('updates guidance after alcohol type is selected', () => {
    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt/Beer' }));

    expect(screen.getByText('Select a liquid measurement for Malt/Beer.')).toBeInTheDocument();
    expect(calculateTax).not.toHaveBeenCalled();
  });

  test('automatically calculates tax when alcohol type and measurement are selected', () => {
    calculateTax.mockReturnValue('0.01');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt/Beer' }));
    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));

    expect(calculateTax).toHaveBeenCalledWith('MA', 'Malt/Beer', '12 Ounces', '');
    expect(screen.getByText('Tax calculated from your selections.')).toBeInTheDocument();
    expect(screen.getByText('$0.01')).toBeInTheDocument();
    expect(screen.getByText('Malt/Beer - 12 Ounces')).toBeInTheDocument();
  });

  test('requires proof before automatically calculating spirits tax', () => {
    calculateTax.mockReturnValue('50.00');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));

    expect(screen.getByText('Select a proof to calculate the spirits tax.')).toBeInTheDocument();
    expect(calculateTax).not.toHaveBeenCalled();
    expect(screen.queryByText('$50.00')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '100' }));

    expect(calculateTax).toHaveBeenCalledWith('MA', 'Spirits', '750ml', 100);
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Spirits - 750ml - 100 proof')).toBeInTheDocument();
  });

  test('recalculates when measurement changes after a valid selection', () => {
    calculateTax.mockReturnValueOnce('0.01').mockReturnValueOnce('0.02');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt/Beer' }));
    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));

    expect(screen.getByText('$0.01')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pint' }));

    expect(calculateTax).toHaveBeenLastCalledWith('MA', 'Malt/Beer', 'Pint', '');
    expect(screen.queryByText('$0.01')).not.toBeInTheDocument();
    expect(screen.getByText('$0.02')).toBeInTheDocument();
  });

  test('resets measurement, proof, and result when alcohol type changes', () => {
    calculateTax.mockReturnValue('50.00');

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Spirits' }));
    fireEvent.click(screen.getByRole('button', { name: '750ml' }));
    fireEvent.click(screen.getByRole('button', { name: '100' }));

    expect(screen.getByText('$50.00')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Malt/Beer' }));

    expect(screen.getByText('Select a liquid measurement for Malt/Beer.')).toBeInTheDocument();
    expect(screen.queryByText('$50.00')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '100' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '12 Ounces' })).toHaveAttribute('aria-pressed', 'false');
  });

  test('shows calculation errors after selections are otherwise valid', () => {
    calculateTax.mockImplementation(() => {
      throw new Error('Invalid liquid measurement');
    });

    render(<AlcoholTaxCalculator {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Malt/Beer' }));
    fireEvent.click(screen.getByRole('button', { name: '12 Ounces' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid liquid measurement');
  });
});
