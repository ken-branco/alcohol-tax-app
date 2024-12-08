// src/__tests__/PageToggle.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PageToggle from '../PageToggle';
import AlcoholTaxCalculator from '../AlcoholTaxCalculator';
import InformationPage from '../InformationPage';
import FeedbackPage from '../FeedbackPage'; // Import FeedbackPage

describe('PageToggle', () => {
  test('renders and toggles between pages', () => {
    const setShowPage = jest.fn();

    render(<PageToggle setShowPage={setShowPage} />);

    // Simulate click to go to Tax Calculator
    fireEvent.click(screen.getByText('Go to Tax Calculator'));
    expect(setShowPage).toHaveBeenCalledWith('calculator');

    // Simulate click to go to Information Page
    fireEvent.click(screen.getByText('Go to Information Page'));
    expect(setShowPage).toHaveBeenCalledWith('information');

    // Simulate click to go to Feedback Page
    fireEvent.click(screen.getByText('Give Feedback'));
    expect(setShowPage).toHaveBeenCalledWith('feedback');
  });

  test('should render Feedback Page correctly when toggled', () => {
    render(<FeedbackPage />);
    
    // Check that the feedback form or an identifying element is present
    expect(screen.getByText('We Value Your Feedback!')).toBeInTheDocument();
  });

  test('should render Tax Calculator Page when toggled', () => {
    render(<AlcoholTaxCalculator 
      alcoholTypes={['Malt', 'Wine', 'Sparkling', 'Beer', 'Spirits', 'Cider']}
      allLiquidMeasurements={['12 Ounces', 'Pint', 'Case']}
      specificLiquidMeasurements={['250ml', '750ml', '1l', '1_75l']}
      proofOptions={[80, 90, 100, 120]} 
    />);
    
    // Check that the tax calculator content is rendered
    expect(screen.getByText('State: Massachusetts')).toBeInTheDocument();
    expect(screen.getByText('Alcohol Tax Calculator')).toBeInTheDocument();
  });

  test('should render Information Page when toggled', () => {
    render(<InformationPage />);
    
    // Check that the information page content is rendered
    expect(screen.getByText('About the Alcohol Tax Calculator')).toBeInTheDocument();
  });
});

