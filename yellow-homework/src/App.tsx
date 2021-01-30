import React, { useEffect } from 'react';

import Header from './core/components/Header';
import AuthPage from './pages/auth';
import * as AuthService from './core/services/auth';

const App: React.FC = () => {
  useEffect(() => {
    AuthService.loginUser()
      .then((res) => {
        console.log('res', res);
      })
  }, []);

  return (
    <div id="App">
      <Header />
      <AuthPage />
    </div>
  );
}

export default App;
