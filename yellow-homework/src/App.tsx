import React, { useMemo, useState } from 'react';

import Header from './core/components/Header';
import Loader from './core/components/Loader';
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import { GlobalContextObject, GlobalContext } from './core/context/global';
import * as AuthService from './core/services/auth';

const App: React.FC = () => {
  const token = AuthService.getSavedToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contextValue = useMemo((): GlobalContextObject => ({
    isAuthenticated,
    setIsAuthenticated,
    setIsLoading,
  }), [isAuthenticated]);

  return (
    <div id="App">
      {isLoading && <Loader />}
      <GlobalContext.Provider value={contextValue}>
        <Header />
        {isAuthenticated ? (
          <MainPage />
        ): (
          <AuthPage />
        )}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
