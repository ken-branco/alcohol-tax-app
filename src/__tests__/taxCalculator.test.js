// src/__tests__/taxCalculator.test.js
import { calculateTax } from '../taxCalculator';

describe('calculateTax', () => {
  test('should calculate tax for Malt/Beer', () => {
    const tax = calculateTax('MA', 'Malt/Beer', '12 Ounces');
    expect(tax).toBe('0.01');
  });

  // Test for Wine alcohol type
  test('should calculate tax for Wine', () => {
    const tax = calculateTax('MA', 'Wine', '750ml');
    expect(tax).toBe('0.11'); // Expected tax is 0.55 * 750 / 1000 / 3.78541 (converted to gallons)
  });

  test('should calculate tax for Sparkling', () => {
    const tax = calculateTax('MA', 'Sparkling', '750ml');
    expect(tax).toBe('0.14');
  });
  
  test('should calculate tax for Spirits using proof gallons for proof between 31 and 100', () => {
    const tax = calculateTax('MA', 'Spirits', '750ml', 80);
    expect(tax).toBe('0.64');
  });

  test('should calculate tax for Spirits using proof gallons for proof greater than 100', () => {
    const tax = calculateTax('MA', 'Spirits', '750ml', 120);
    expect(tax).toBe('0.96');
  });

  test('should calculate tax for a case of Malt/Beer', () => {
    const tax = calculateTax('MA', 'Malt/Beer', 'Case');
    expect(tax).toBe('0.24');
  });

  // Test for Cider alcohol type
  test('should calculate tax for Cider', () => {
    const tax = calculateTax('MA', 'Cider', '12 Ounces');
    expect(tax).toBe('0.00'); // Expected tax is 0.03 * 12 / 128 (converted to gallons)
  });

  // Test for invalid state
  test('should throw an error for invalid state', () => {
    expect(() => calculateTax('XX', 'Spirits', '12 Ounces')).toThrow('Invalid state');
  });

  // Test for invalid alcohol type
  test('should throw an error for invalid alcohol type for the selected state', () => {
    expect(() => calculateTax('MA', 'InvalidAlcohol', '12 Ounces')).toThrow('Invalid alcohol type for the selected state');
  });

  // Test for invalid liquid measurement
  test('should throw an error for invalid liquid measurement', () => {
    expect(() => calculateTax('MA', 'Spirits', 'invalidMeasurement')).toThrow('Invalid liquid measurement');
  });

  test('should throw an error when proof is missing for Spirits', () => {
    expect(() => calculateTax('MA', 'Spirits', '750ml')).toThrow('Proof is required for spirits');
  });
});
