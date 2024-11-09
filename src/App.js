import React, { useState } from 'react';
import './App.css';
import beerImage from './images/beer.jpg'
import wineImage from './images/wine.jpg'
import maltImage from './images/malt.jpg'
import sparklingImage from './images/sparkling.jpg'
import spiritsImage from './images/spirits.jpg'
import ciderImage from './images/cider.jpg'
import newEnglandImage from './images/new-england.jpg';

import { calculateTax } from './taxCalculator'; // Import the tax calculation logic

function App() {
  const [state, setState] = useState('');
  const [alcoholType, setAlcoholType] = useState('');
  const [liquidMeasurement, setLiquidMeasurement] = useState('');
  const [proof, setProof] = useState('');
  const [taxPaid, setTaxPaid] = useState(null);
  const [error, setError] = useState('');

  const alcoholTypes = [
    { name: 'Spirits', image: spiritsImage },
    { name: 'Beer', image: beerImage },
    { name: 'Wine', image: wineImage },
    { name: 'Sparkling', image: sparklingImage },
    { name: 'Malt', image: maltImage },
    { name: 'Cider', image: ciderImage },
  ];

  const liquidMeasurements = [
    '12 ounces',
    '1 pint',
    '72 ounces',
    '144 ounces',
    '288 ounces',
    '250 ml',
    '750 ml',
    '1 liter',
    '1.75 liter'
  ];

  const handleStateSelection = (stateCode) => {
    setState(stateCode);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setTaxPaid(null);

    try {
      const tax = calculateTax(state, alcoholType, liquidMeasurement, alcoholType === 'Spirits' ? proof : null);
      setTaxPaid(tax);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Alcohol Tax Calculator</h1>

      <div className="map-container">
        <img src={newEnglandImage} alt="New England Map" useMap="#nemap"/>
        <map name="nemap">
          <area shape="poly" coords="21,389,8,441,195,445,187,377" alt="Massachusetts-1" onClick={() => handleStateSelection('MA')} />
          <area shape="poly" coords="140,443,225,441,243,479,162,485" alt="Massachusetts-2" onClick={() => handleStateSelection('MA')} />
        </map>
      </div>

      <p>Selected State: {state || 'None'}</p>

      <form onSubmit={handleSubmit}>
      <div>
        <label>Select Alcohol Type:</label>
        <div className="alcohol-type-container">
          {alcoholTypes.map((type, index) => (
            <div
              key={index}
              className="alcohol-type"
              onClick={() => setAlcoholType(type.name)}
            >
              <img src={type.image} alt={type.name} className="alcohol-type-image" />
              <p>{type.name}</p>
            </div>
          ))}
        </div>
      </div>

        {alcoholType === 'Spirits' && (
          <div>
            <label>Proof (32-200):</label>
            <input
              type="number"
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              min="32"
              max="200"
              required
            />
          </div>
        )}

        <div>
          <label>Liquid Measurement:</label>
          <select value={liquidMeasurement} onChange={(e) => setLiquidMeasurement(e.target.value)} required>
            <option value="">Select Liquid Measurement</option>
            {liquidMeasurements.map((measurement, index) => (
              <option key={index} value={measurement}>
                {measurement}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={!state}>Calculate Tax</button>
        </form>

      {taxPaid !== null && (
        <div>
          <h2>Tax Paid: ${taxPaid}</h2>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
