import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './core/components/Header';
import Loader from './core/components/Loader';
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import { GlobalContextObject, GlobalContext } from './core/context/global';
import * as AuthService from './core/services/auth';
import { MainRoutes } from './core/constants/routes';

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
      <GlobalContext.Provider value={contextValue}>
        {isLoading && <Loader />}
        <Router>
          <Header showRoutesNavigation={isAuthenticated} />
          <Switch>
            {isAuthenticated ? (
              <MainPage />
            ): (
              <Route name={MainRoutes.Auth} exact>
                <AuthPage />
              </Route>
            )}
          </Switch>
        </Router>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
