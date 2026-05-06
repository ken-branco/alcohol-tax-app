// PageToggle.js
import React from 'react';

const PageToggle = ({ setShowPage }) => (
  <div className="page-toggle">
    <button onClick={() => setShowPage('calculator')}>Go to Tax Calculator</button>
    <button onClick={() => setShowPage('information')}>Go to Information Page</button>
    <button onClick={() => setShowPage('feedback')}>Give Feedback</button> {/* New button */}
  </div>
);

export default PageToggle;
