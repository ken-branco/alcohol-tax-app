import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PageToggle from '../PageToggle';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import InformationPage from '../InformationPage';
import FeedbackPage from '../FeedbackPage';

describe('PageToggle', () => {
  test('renders and toggles between pages', () => {
    const setShowPage = vi.fn();

    render(<PageToggle currentPage="calculator" setShowPage={setShowPage} />);

    fireEvent.click(screen.getByRole('button', { name: 'Calculator' }));
    expect(setShowPage).toHaveBeenCalledWith('calculator');

    fireEvent.click(screen.getByRole('button', { name: 'Information' }));
    expect(setShowPage).toHaveBeenCalledWith('information');

    fireEvent.click(screen.getByRole('button', { name: 'Feedback' }));
    expect(setShowPage).toHaveBeenCalledWith('feedback');
  });

  test('marks the current page as active', () => {
    render(<PageToggle currentPage="information" setShowPage={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Information' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Calculator' })).not.toHaveAttribute('aria-current');
  });

  test('should render Feedback Page correctly when toggled', () => {
    render(<FeedbackPage />);

    expect(screen.getByText('We Value Your Feedback!')).toBeInTheDocument();
  });

  test('should render Tax Calculator Page when toggled', () => {
    render(<AlcoholTaxCalculator 
      alcoholTypes={['Malt/Beer', 'Wine', 'Sparkling', 'Spirits', 'Cider']}
      allLiquidMeasurements={['12 Ounces', 'Pint', 'Case']}
      specificLiquidMeasurements={['250ml', '750ml', '1l', '1_75l']}
      proofOptions={[80, 90, 100, 120]} 
    />);

    expect(screen.getByText('State: Massachusetts')).toBeInTheDocument();
    expect(screen.getByText('Alcohol Tax Calculator')).toBeInTheDocument();
  });

  test('should render Information Page when toggled', () => {
    render(<InformationPage />);

    expect(screen.getByText('About the Alcohol Tax Calculator')).toBeInTheDocument();
  });
});
