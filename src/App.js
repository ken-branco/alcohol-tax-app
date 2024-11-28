// App.js
import React, { useState } from 'react';
import './App.css'; // Assuming the CSS file is imported
import AlcoholTaxCalculator from './AlcoholTaxCalculator';
import InformationPage from './InformationPage';
import PageToggle from './PageToggle';

const App = () => {
  const [showCalculator, setShowCalculator] = useState(true);

  // Available options
  const alcoholTypes = ['Malt', 'Wine', 'Sparkling', 'Beer', 'Spirits', 'Cider'];
  const allLiquidMeasurements = ['12 Ounces', 'Pint', '6-Pack', '12-Pack', 'Case', '250ml', '750ml', '1L', '1.75L'];
  const specificLiquidMeasurements = ['250ml', '750ml', '1L', '1.75L'];
  const proofOptions = [80, 90, 100, 120];

  return (
    <div className="App">
      <PageToggle setShowCalculator={setShowCalculator} />
      
      {showCalculator ? 
        <AlcoholTaxCalculator 
          alcoholTypes={alcoholTypes} 
          allLiquidMeasurements={allLiquidMeasurements}
          specificLiquidMeasurements={specificLiquidMeasurements} 
          proofOptions={proofOptions} 
        />
        : <InformationPage />
      }
    </div>
  );
};

export default App;
