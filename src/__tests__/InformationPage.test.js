// src/__tests__/InformationPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import InformationPage from '../InformationPage';

describe('InformationPage', () => {
  test('renders information page correctly', () => {
    render(<InformationPage />);

    expect(screen.getByText('About the Alcohol Tax Calculator')).toBeInTheDocument();
    expect(screen.getByText('The tax rate is multiplied by the appropriate conversion factor based on the volume and type of alcohol. For spirits, an additional proof factor is considered, where higher proof alcohol results in a higher tax rate.')).toBeInTheDocument();
  });
});
