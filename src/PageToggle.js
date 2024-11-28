// PageToggle.js
import React from 'react';

const PageToggle = ({ setShowCalculator }) => (
  <div className="page-toggle">
    <button onClick={() => setShowCalculator(true)}>Go to Tax Calculator</button>
    <button onClick={() => setShowCalculator(false)}>Go to Information Page</button>
  </div>
);

export default PageToggle;
