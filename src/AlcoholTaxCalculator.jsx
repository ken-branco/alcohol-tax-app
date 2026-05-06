import React, { useState } from 'react';
import { calculateTax } from './taxCalculator';

const bottleOnlyTypes = ['Spirits', 'Wine', 'Sparkling'];

const AlcoholTaxCalculator = ({ alcoholTypes, allLiquidMeasurements, specificLiquidMeasurements, proofOptions }) => {
  const [alcoholType, setAlcoholType] = useState('');
  const [liquidMeasurement, setLiquidMeasurement] = useState('');
  const [proof, setProof] = useState('');
  const [taxPaid, setTaxPaid] = useState(null);
  const [error, setError] = useState('');

  const availableMeasurements = bottleOnlyTypes.includes(alcoholType)
    ? specificLiquidMeasurements
    : allLiquidMeasurements.filter((measurement) => !specificLiquidMeasurements.includes(measurement));

  const clearOutcome = () => {
    setTaxPaid(null);
    setError('');
  };

  const handleAlcoholTypeChange = (type) => {
    setAlcoholType(type);
    setLiquidMeasurement('');
    setProof('');
    clearOutcome();
  };

  const handleMeasurementChange = (measurement) => {
    setLiquidMeasurement(measurement);
    clearOutcome();
  };

  const handleProofChange = (option) => {
    setProof(option);
    clearOutcome();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!alcoholType || !liquidMeasurement || (alcoholType === 'Spirits' && !proof)) {
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
    <section className="calculator-panel" aria-labelledby="calculator-title">
      <header className="calculator-header">
        <div>
          <p className="eyebrow">State: Massachusetts</p>
          <h1 id="calculator-title">Alcohol Tax Calculator</h1>
        </div>
      </header>

      <form className="calculator-form" onSubmit={handleSubmit}>
        <fieldset className="choice-group">
          <legend>Select Alcohol Type</legend>
          <div className="widget-container">
            {alcoholTypes.map((type, index) => (
              <button
                type="button"
                key={index}
                className={`widget ${alcoholType === type ? 'selected' : ''}`}
                aria-pressed={alcoholType === type}
                onClick={() => handleAlcoholTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>Select Liquid Measurement</legend>
          <div className="widget-container">
            {availableMeasurements.map((measurement, index) => (
              <button
                type="button"
                key={index}
                className={`widget ${liquidMeasurement === measurement ? 'selected' : ''}`}
                aria-pressed={liquidMeasurement === measurement}
                onClick={() => handleMeasurementChange(measurement)}
              >
                {measurement}
              </button>
            ))}
          </div>
        </fieldset>

        {alcoholType === 'Spirits' && (
          <fieldset className="choice-group">
            <legend>Select Proof</legend>
            <div className="widget-container compact">
              {proofOptions.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  className={`widget ${proof === option ? 'selected' : ''}`}
                  aria-pressed={proof === option}
                  onClick={() => handleProofChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <button className="calculate-button" type="submit" disabled={!alcoholType || !liquidMeasurement || (alcoholType === 'Spirits' && !proof)}>
          Calculate Tax
        </button>
      </form>

      {taxPaid !== null && (
        <div className="result-panel" aria-live="polite">
          <p className="result-label">Tax Paid</p>
          <p className="result-value">${taxPaid}</p>
          <p className="result-details">
            {alcoholType} - {liquidMeasurement}
            {alcoholType === 'Spirits' ? ` - ${proof} proof` : ''}
          </p>
        </div>
      )}

      {error && <p className="form-error" role="alert">{error}</p>}
    </section>
  );
};

export default AlcoholTaxCalculator;
