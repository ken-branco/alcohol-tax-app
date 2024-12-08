// FeedbackPage.js
import React from 'react';
import './FeedbackPage.css'; // Assuming you'll create CSS to style the page

const FeedbackPage = () => {
  return (
    <div className="feedback-page">
      <h2>We Value Your Feedback!</h2>
      <p>
        Please fill out the form below to provide us with your feedback or suggestions. Thank you!.
      </p>
      
      <div className="form-container">
        <iframe
          title="User Feedback Form"
          src="https://docs.google.com/forms/d/16soL6Sm9AlDqpxAt29s7T-xFx4wrBuzlDY2iTxjXgiU/viewform?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default FeedbackPage;
