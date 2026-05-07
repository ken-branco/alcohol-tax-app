import React, { useMemo, useState } from 'react';
import { calculateTax } from './taxCalculator';

const bottleOnlyTypes = ['Spirits', 'Wine', 'Sparkling'];

const AlcoholTaxCalculator = ({ alcoholTypes, allLiquidMeasurements, specificLiquidMeasurements, proofOptions }) => {
  const [alcoholType, setAlcoholType] = useState('');
  const [liquidMeasurement, setLiquidMeasurement] = useState('');
  const [proof, setProof] = useState('');

  const availableMeasurements = bottleOnlyTypes.includes(alcoholType)
    ? specificLiquidMeasurements
    : allLiquidMeasurements.filter((measurement) => !specificLiquidMeasurements.includes(measurement));

  const isReadyToCalculate = Boolean(alcoholType && liquidMeasurement && (alcoholType !== 'Spirits' || proof));

  const guidance = (() => {
    if (!alcoholType) {
      return 'Select an alcohol type to begin.';
    }

    if (!liquidMeasurement) {
      return `Select a liquid measurement for ${alcoholType}.`;
    }

    if (alcoholType === 'Spirits' && !proof) {
      return 'Select a proof to calculate the spirits tax.';
    }

    return 'Tax calculated from your selections.';
  })();

  const taxResult = useMemo(() => {
    if (!isReadyToCalculate) {
      return { taxPaid: null, error: '' };
    }

    try {
      return {
        taxPaid: calculateTax('MA', alcoholType, liquidMeasurement, proof),
        error: ''
      };
    } catch (err) {
      return { taxPaid: null, error: err.message };
    }
  }, [alcoholType, isReadyToCalculate, liquidMeasurement, proof]);

  const handleAlcoholTypeChange = (type) => {
    setAlcoholType(type);
    setLiquidMeasurement('');
    setProof('');
  };

  const handleMeasurementChange = (measurement) => {
    setLiquidMeasurement(measurement);
  };

  const handleProofChange = (option) => {
    setProof(option);
  };

  return (
    <section className="calculator-panel" aria-labelledby="calculator-title">
      <header className="calculator-header">
        <div>
          <p className="eyebrow">State: Massachusetts</p>
          <h1 id="calculator-title">Alcohol Tax Calculator</h1>
        </div>
      </header>

      <div className="selection-status" aria-live="polite">
        {guidance}
      </div>

      <div className="calculator-form">
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
      </div>

      {taxResult.taxPaid !== null && (
        <div className="result-panel" aria-live="polite">
          <p className="result-label">Tax Paid</p>
          <p className="result-value">${taxResult.taxPaid}</p>
          <p className="result-details">
            {alcoholType} - {liquidMeasurement}
            {alcoholType === 'Spirits' ? ` - ${proof} proof` : ''}
          </p>
        </div>
      )}

      {taxResult.error && <p className="form-error" role="alert">{taxResult.error}</p>}
    </section>
  );
};

export default AlcoholTaxCalculator;
