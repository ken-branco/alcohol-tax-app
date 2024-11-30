// src/__tests__/taxCalculator.test.js
import { calculateTax } from '../taxCalculator';

describe('calculateTax', () => {
  // Test for Malt alcohol type
  test('should calculate tax for Malt', () => {
    const tax = calculateTax('MA', 'Malt', '12 Ounces');
    expect(tax).toBe('0.01'); // Expected tax is 0.10645 * 12 / 128 (converted to gallons)
  });

  // Test for Wine alcohol type
  test('should calculate tax for Wine', () => {
    const tax = calculateTax('MA', 'Wine', '750ml');
    expect(tax).toBe('0.11'); // Expected tax is 0.55 * 750 / 1000 / 3.78541 (converted to gallons)
  });

    // Test for Sparkling alcohol type
    test('should calculate tax for Sparkling', () => {
      const tax = calculateTax('MA', 'Sparkling', '750ml');
      expect(tax).toBe('0.14'); // Expected tax is 0.70 * 750 / 1000 / 3.78541 (converted to gallons)
    });
  
  // Test for Spirits alcohol type with proof between 31 and 100 (normal case)
  test('should calculate tax for Spirits with proof between 31 and 100', () => {
    const tax = calculateTax('MA', 'Spirits', '750ml', 80);
    expect(tax).toBe('0.80'); // Expected tax based on 4.05 * 750 / 1000 / 3.78541 * (80/100)
  });

  // Test for Spirits alcohol type with proof greater than 100
  test('should calculate tax for Spirits with proof greater than 100', () => {
    const tax = calculateTax('MA', 'Spirits', '750ml', 120);
    expect(tax).toBe('0.96'); // Expected tax based on 4.05 * 750 / 1000 / 3.78541 * (120/100)
  });

  // Test for Beer alcohol type
  test('should calculate tax for Beer', () => {
    const tax = calculateTax('MA', 'Beer', '12 Ounces');
    expect(tax).toBe('0.10'); // Expected tax is 1.10 * 12 / 128 (converted to gallons)
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

 
});
