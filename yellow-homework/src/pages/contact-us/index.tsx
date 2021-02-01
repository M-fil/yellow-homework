import './styles.scss';
import React from 'react';

import FeedbackForm from './components/FeedbackForm';

const ContactUsPage: React.FC = () => {
  return (
    <div className="contact-us-page">
      <div className="contact-us-page__wrapper">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
