import React, { useState } from 'react';
import './App.css';
import AlcoholTaxCalculator from './AlcoholTaxCalculator';
import InformationPage from './InformationPage';
import PageToggle from './PageToggle';
import FeedbackPage from './FeedbackPage';

const App = () => {
  const [showPage, setShowPage] = useState('calculator');

  const alcoholTypes = ['Malt', 'Wine', 'Sparkling', 'Beer', 'Spirits', 'Cider'];
  const allLiquidMeasurements = ['12 Ounces', 'Pint', '6-Pack', '12-Pack', 'Case', '250ml', '750ml', '1L', '1.75L'];
  const specificLiquidMeasurements = ['250ml', '750ml', '1L', '1.75L'];
  const proofOptions = [80, 90, 100, 120];

  return (
    <div className="app-shell">
      <PageToggle currentPage={showPage} setShowPage={setShowPage} />

      <main className={`page page-${showPage}`}>
        {showPage === 'calculator' && (
          <AlcoholTaxCalculator
            alcoholTypes={alcoholTypes}
            allLiquidMeasurements={allLiquidMeasurements}
            specificLiquidMeasurements={specificLiquidMeasurements}
            proofOptions={proofOptions}
          />
        )}

        {showPage === 'information' && <InformationPage />}

        {showPage === 'feedback' && <FeedbackPage />}
      </main>

      <footer className="site-footer">
        <small>Copyright &copy; 2026 Ken Branco. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default App;
