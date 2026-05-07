// taxCalculator.js

const taxRates = {
  MA: {
    'Malt/Beer': { rate: 3.30 / 31, perUnit: 'gallon' },
    'Wine': { rate: 0.55, perUnit: 'gallon' },
    'Sparkling': { rate: 0.70, perUnit: 'gallon' },
    'Spirits': { rate: 4.05, perUnit: 'gallon' },
    'Cider': { rate: 0.03, perUnit: 'gallon' }
  }
  // Add more states and tax rates as needed
};

const measurementFactors = {
  '12 Ounces': 12 / 128, // Convert ounces to gallons
  'Pint': 16 / 128, // Convert pints to gallons
  '6-Pack': 72 / 128, // Convert ounces to gallons
  '12-Pack': 144 / 128, // Convert ounces to gallons
  'Case': 288 / 128, // Convert ounces to gallons
  '250ml': 250 / 1000 / 3.78541, // Convert ml to gallons
  '750ml': 750 / 1000 / 3.78541, // Convert ml to gallons
  '1L': 1 / 3.78541, // Convert liters to gallons
  '1.75L': 1.75 / 3.78541 // Convert liters to gallons
};

// Function to calculate tax
export const calculateTax = (state, alcoholType, liquidMeasurement, proof = null) => {
  // Check if state exists in the taxRates
  if (!taxRates[state]) {
    throw new Error('Invalid state');
  }

  // Check if the alcohol type exists in the state
  const alcoholRate = taxRates[state][alcoholType];
  if (!alcoholRate) {
    throw new Error('Invalid alcohol type for the selected state');
  }

  // Check if the liquid measurement is valid
  const factor = measurementFactors[liquidMeasurement];
  if (!factor) {
    throw new Error('Invalid liquid measurement');
  }

  if (alcoholType === 'Spirits') {
    if (!proof) {
      throw new Error('Proof is required for spirits');
    }

    const tax = alcoholRate.rate * factor * (proof / 100);
    return tax.toFixed(2);
  }

  const tax = alcoholRate.rate * factor;
  return tax.toFixed(2);
};
