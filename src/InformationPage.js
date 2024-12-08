// InformationPage.js

import React from 'react';
import './InformationPage.css'; // Assuming we have a separate CSS file for styling

const InformationPage = () => (
  <div className="info-page">
    <h2>About the Alcohol Tax Calculator</h2>
    
    <section className="info-section">
      <h3 className="section-title">Summary</h3>
      <p className="section-content">
        Alcohol tax in Massachusetts is levied at the wholesaler/importer level and is based on the type and quantity of alcohol sold. 
        Taxes are calculated based on the volume of alcohol measured in gallons, with different rates applied to different types of alcohol, such as beer, wine, spirits, and cider. 
        The tax rates can vary based on alcohol type, volume, and proof for spirits. <br></br><br></br>
        
        
        According to this <a className="section-link" href="https://www.bu.edu/sph/news/articles/2023/david-jernigan-legislative-briefing-on-alcohol" target="_blank" rel="noopener noreferrer">
        2023 artticle published by the Boston University School of Public health
      </a>, the alcohol taxes 'are usually passed along to retailers and consumers',
        so we can reasonably assume the retail price of all types and sizes of alcohol include this tax.  
      </p>
    </section>

    <section className="info-section">
      <h3 className="section-title">Interesting Insights</h3>
      <p className="section-content">
        Since the alcohol tax is levied by volume, and does not take into account the value of the alcohol, there are surprising results when you compare
        the pass-through tax paid at the Point of Sale for a a $100 750ml bottle of Wine versus a case of Budwesier (24 12-ounce cans). <br></br><br></br>
        Taxes Paid on:
        <br></br>$100 750ml bottle of Wine: <span className="highlight">$0.11</span>
        <br></br>Case of Budwesier: <span className="highlight">$2.48</span>
        <br></br>

        That is a <span className="highlight">2155%</span> difference in pass-through tax!  

      </p>
    </section>

    <section className="info-section">
      <h3 className="section-title">Calculation</h3>
      <p className="section-content">
        The alcohol tax calculation depends on the following factors:
      </p>
      <ul className="calculation-list">
        <li><strong>Alcohol Type:</strong> Different rates apply to beer, wine, spirits, and cider.</li>
        <li><strong>Liquid Measurement:</strong> The volume of alcohol is converted to gallons to apply the tax rate.</li>
        <li><strong>Proof (for Spirits):</strong> For spirits, the proof value (alcohol concentration) affects the calculation, with higher proof alcohol being taxed more.</li>
      </ul>
      <p className="section-content">
        The tax rate is multiplied by the appropriate conversion factor based on the volume and type of alcohol. For spirits, an additional proof factor is considered, where higher proof alcohol results in a higher tax rate.
      </p>
    </section>

    <section className="info-section">
      <h3 className="section-title">References</h3>
      <p className="section-content">
        The information used for the tax calculation comes from the Massachusetts Department of Revenue's guidelines on alcohol tax rates. The official documentation provides detailed tax rates and measurement conversion factors used for calculating alcohol excise tax in the state of Massachusetts.
      </p>
      <a className="section-link" href="https://www.mass.gov/info-details/dor-alcoholic-beverage-excise-tax" target="_blank" rel="noopener noreferrer">
        Read more about the tax guidelines.
      </a><br></br><br></br>

      <a className="section-link" href="https://en.wikipedia.org/wiki/Wine_gallon" target="_blank" rel="noopener noreferrer">
        What is a Wine Gallon?.
      </a><br></br><br></br>

      <a className="section-link" href="https://www.oxfordreference.com/display/10.1093/acref/9780199311132.001.0001/acref-9780199311132-e-638" target="_blank" rel="noopener noreferrer">
        What is a Proof Gallon?.
      </a>
    </section>

  </div>
);

export default InformationPage;
