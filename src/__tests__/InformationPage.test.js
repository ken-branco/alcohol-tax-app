// src/__tests__/InformationPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import InformationPage from '../InformationPage';

describe('InformationPage', () => {
  test('renders information page correctly', () => {
    render(<InformationPage />);

    expect(screen.getByText('About This App')).toBeInTheDocument();
    expect(screen.getByText('This app calculates the alcohol tax based on your input')).toBeInTheDocument();
    expect(screen.getByText('If you have any questions, please refer to the help section or contact support.')).toBeInTheDocument();
  });
});
