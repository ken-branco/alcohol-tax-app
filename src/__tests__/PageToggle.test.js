// src/__tests__/PageToggle.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PageToggle from '../PageToggle';

describe('PageToggle', () => {
  test('renders and toggles between pages', () => {
    const setShowCalculator = jest.fn();

    render(<PageToggle setShowCalculator={setShowCalculator} />);

    // Simulate click to go to Tax Calculator
    fireEvent.click(screen.getByText('Go to Tax Calculator'));
    expect(setShowCalculator).toHaveBeenCalledWith(true);

    // Simulate click to go to Information Page
    fireEvent.click(screen.getByText('Go to Information Page'));
    expect(setShowCalculator).toHaveBeenCalledWith(false);
  });
});
