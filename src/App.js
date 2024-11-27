import React, { useState } from 'react';
import './App.css'; // Assuming the CSS file is imported
import { calculateTax } from './taxCalculator'; // Import the calculateTax function

const AlcoholTaxCalculator = () => {
  const [alcoholType, setAlcoholType] = useState('');
  const [liquidMeasurement, setLiquidMeasurement] = useState('');
  const [proof, setProof] = useState('');
  const [taxPaid, setTaxPaid] = useState(null);
  const [error, setError] = useState('');

  // Available options
  const alcoholTypes = ['Malt', 'Wine', 'Sparkling', 'Beer', 'Spirits', 'Cider'];
  const allLiquidMeasurements = ['12 Ounces', 'Pint', '6-Pack', '12-Pack', 'Case', '250ml', '750ml', '1L', '1.75L'];
  const specificLiquidMeasurements = ['250ml', '750ml', '1L', '1.75L']; // Specific measurements for certain alcohol types
  const proofOptions = [80, 90, 100, 120];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!alcoholType || !liquidMeasurement) {
      setError('Please select alcohol type, liquid measurement, and proof (if applicable).');
      return;
    }

    try {
      // Use the imported tax calculator logic
      const calculatedTax = calculateTax('MA', alcoholType, liquidMeasurement, proof);
      setTaxPaid(calculatedTax); // Set the calculated tax

      setError(''); // Clear error if valid
    } catch (err) {
      setError(err.message); // Handle any errors from tax calculation
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
          {/* Render liquid measurements based on the selected alcohol type */}
          { (alcoholType === 'Spirits' || alcoholType === 'Wine' || alcoholType === 'Sparkling') ?
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

const InformationPage = () => (
  <div className="info-page">
    <h2>About This App</h2>
    <p>This app calculates the alcohol tax based on your input for the alcohol type, liquid measurement, and proof (if applicable). It is specifically designed for Massachusetts.</p>
    <p>Select an alcohol type, a liquid measurement, and a proof value (for Spirits) to calculate the tax.</p>
    <p>If you have any questions, please refer to the help section or contact support.</p>
  </div>
);

const App = () => {
  const [showCalculator, setShowCalculator] = useState(true);

  return (
    <div className="App">
      <div className="page-toggle">
        <button onClick={() => setShowCalculator(true)}>Go to Tax Calculator</button>
        <button onClick={() => setShowCalculator(false)}>Go to Information Page</button>
      </div>

      {showCalculator ? <AlcoholTaxCalculator /> : <InformationPage />}
    </div>
  );
};

export default App;
