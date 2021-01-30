import React from 'react';

import Header from './core/components/Header';
import AuthPage from './pages/auth';

const App: React.FC = () => {
  return (
    <div id="App">
      <Header />
      <AuthPage />
    </div>
  );
}

export default App;
