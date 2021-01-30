import './styles.scss'
import React from 'react';

import LoginModal from './components/LoginModal';

const AuthPage: React.FC = () => {
  return (
    <div className="auth-page">
      <LoginModal />
    </div>
  );
};

export default AuthPage;
