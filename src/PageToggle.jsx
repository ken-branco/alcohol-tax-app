import React from 'react';

const pages = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'information', label: 'Information' },
  { id: 'feedback', label: 'Feedback' }
];

const PageToggle = ({ currentPage, setShowPage }) => (
  <nav className="page-toggle" aria-label="Primary">
    {pages.map((page) => (
      <button
        key={page.id}
        type="button"
        className={`tab-button ${currentPage === page.id ? 'active' : ''}`}
        aria-current={currentPage === page.id ? 'page' : undefined}
        onClick={() => setShowPage(page.id)}
      >
        {page.label}
      </button>
    ))}
  </nav>
);

export default PageToggle;
