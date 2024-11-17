import React, { useState } from 'react';
import './App.css';

import twelveOunceImage from './images/12_ounce.jpg'
import onePintImage from './images/pint_glass.jpg'
import sixpackImage from './images/six_pack.jpg'
import twelvePackImage from './images/12_pack.jpg'
import caseImage from './images/case_beer.jpg'
import twofiftyImage from './images/250ml_bottle.jpg'
import sevenfiftyImage from './images/750ml_bottle.jpg'
import oneLiterImage from './images/1l_bottle.jpg'
import oneSevenFiveImage from './images/1_75l_bottle.jpg'

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
    { name: 'twelve', label: '12 ounce can/bottle', image: twelveOunceImage },
    { name: 'pint', label: 'Pint (16 ounces)', image: onePintImage },
    { name: 'six_pack', label: '6 Pack', image: sixpackImage },
    { name: 'twelve_pack', label: '12 Pack', image: twelvePackImage },
    { name: 'case', label: 'Case', image: caseImage },
    { name: '250ml', label: '250 ml', image: twofiftyImage },
    { name: '750ml', label: '750 ml', image: sevenfiftyImage },
    { name: '1l', label: '1 Liter', image: oneLiterImage },
    { name: '1_75l', label: '1.75 Liter', image: oneSevenFiveImage },
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
              className={`alcohol-type ${alcoholType === type.name ? 'selected' : ''}`}
              onClick={() => setAlcoholType(type.name)}>
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
        <label>Select Liquid Measurement:</label>
        <div className="liquid-measurement-container">
          {liquidMeasurements.map((measurement, index) => (
            <div
              key={index}
              className={`liquid-measurement ${liquidMeasurement === measurement.name ? 'selected' : ''}`}
              onClick={() => setLiquidMeasurement(measurement.name)}
            >
              <img
               src={measurement.image}  // Image for each liquid measurement
                alt={measurement.name}
                className="liquid-measurement-image"
              />
              <p>{measurement.label}</p>
            </div>
          ))}
        </div>
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
