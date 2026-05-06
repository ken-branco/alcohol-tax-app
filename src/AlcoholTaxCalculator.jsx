// AlcoholTaxCalculator.js
import React, { useState } from 'react';
import { calculateTax } from './taxCalculator'; // Import the tax calculation logic

const AlcoholTaxCalculator = ({ alcoholTypes, allLiquidMeasurements, specificLiquidMeasurements, proofOptions }) => {
  const [alcoholType, setAlcoholType] = useState('');
  const [liquidMeasurement, setLiquidMeasurement] = useState('');
  const [proof, setProof] = useState('');
  const [taxPaid, setTaxPaid] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!alcoholType || !liquidMeasurement) {
      setError('Please select alcohol type, liquid measurement, and proof (if applicable).');
      return;
    }

    try {
      const calculatedTax = calculateTax('MA', alcoholType, liquidMeasurement, proof);
      setTaxPaid(calculatedTax);
      setError('');
    } catch (err) {
      setError(err.message);
      setTaxPaid(null);
    }
  };

  return (
    <div className="App">
      <h1>Alcohol Tax Calculator</h1>
      <p>State: Massachusetts</p>

      <div>
        <label>Select Alcohol Type:</label>
        <div className="widget-container">
          {alcoholTypes.map((type, index) => (
            <div
              key={index}
              className={`widget ${alcoholType === type ? 'selected' : ''}`}
              onClick={() => setAlcoholType(type)}
            >
              <p>{type}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Select Liquid Measurement:</label>
        <div className="widget-container">
          {(alcoholType === 'Spirits' || alcoholType === 'Wine' || alcoholType === 'Sparkling') ?
            specificLiquidMeasurements.map((measurement, index) => (
              <div
                key={index}
                className={`widget ${liquidMeasurement === measurement ? 'selected' : ''}`}
                onClick={() => setLiquidMeasurement(measurement)}
              >
                <p>{measurement}</p>
              </div>
            ))
            :
            allLiquidMeasurements.filter(measurement => !specificLiquidMeasurements.includes(measurement))
            .map((measurement, index) => (
              <div
                key={index}
                className={`widget ${liquidMeasurement === measurement ? 'selected' : ''}`}
                onClick={() => setLiquidMeasurement(measurement)}
              >
                <p>{measurement}</p>
              </div>
            ))
          }
        </div>
      </div>

      {alcoholType === 'Spirits' && (
        <div>
          <label>Select Proof:</label>
          <div className="widget-container">
            {proofOptions.map((option, index) => (
              <div
                key={index}
                className={`widget ${proof === option ? 'selected' : ''}`}
                onClick={() => setProof(option)}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={!alcoholType || !liquidMeasurement || (alcoholType === 'Spirits' && !proof)}>
          Calculate Tax
        </button>
      </form>

      {taxPaid !== null && (
        <div>
          <h2>Tax Paid: ${taxPaid}</h2>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AlcoholTaxCalculator;
