// taxCalculator.js

const taxRates = {
    MA: {
      'Malt': { rate: 3.30, perUnit: '31 gallons' },
      'Wine': { rate: 0.55, perUnit: 'gallon' },
      'Sparkling': { rate: 0.70, perUnit: 'gallon' },
      'Beer': { rate: 1.10, perUnit: 'gallon' },
      'Spirits': { rate: 4.05, perUnit: 'gallon' }, // Updated to include only one option for Spirits
      'Cider': { rate: 0.03, perUnit: 'gallon' }
    }
    // Add more states and tax rates as needed
  };
  
  const measurementFactors = {
    'twelve': 12 / 128, // Convert ounces to gallons
    'pint': 16 / 128, // Convert pints to gallons
    'six_pack': 72 / 128, // Convert ounces to gallons
    'twelve_pack': 144 / 128, // Convert ounces to gallons
    'case': 288 / 128, // Convert ounces to gallons
    '250ml': 250 / 1000 / 3.78541, // Convert ml to gallons
    '750ml': 750 / 1000 / 3.78541, // Convert ml to gallons
    '1l': 1 / 3.78541, // Convert liters to gallons
    '1_75l': 1.75 / 3.78541 // Convert liters to gallons
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
  
    // Special logic for Spirits with a Proof value
    if (alcoholType === 'Spirits') {
      if (proof === null || proof <= 31 || proof >= 201) {
        throw new Error('Proof value must be provided and must be between 31 and 201');
      }
  
      if (proof > 100) {
        // Calculate using Proof Gallons method
        const proofGallonValue = proof / 100;
        const fractionalUSGallonValue = factor; // Already in gallons
        const fractionalProofGallonValue = fractionalUSGallonValue * proofGallonValue;
        const tax = fractionalProofGallonValue * alcoholRate.rate;
        return tax.toFixed(2);
      }
    }
  
    // General calculation for proof between 31 and 100 or other alcohol types
    const tax = alcoholRate.rate * factor;
    return tax.toFixed(2);
  };
  