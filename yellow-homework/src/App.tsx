import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Header from './core/components/Header';
import Loader from './core/components/Loader';
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import { GlobalContextObject, GlobalContext } from './core/context/global';
import * as AuthService from './core/services/auth';
import * as JogService from './core/services/jogs';
import { MainRoutes } from './core/constants/routes';

const App: React.FC = () => {
  const token = AuthService.getSavedToken();
  const savedFilteredValues = JogService.getFilterValues();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<{ from: string, to: string }>({
    from: savedFilteredValues?.fromDate || '',
    to: savedFilteredValues?.toDate || '',
  });
  const contextValue = useMemo((): GlobalContextObject => ({
    isAuthenticated,
    setIsAuthenticated,
    setIsLoading,
    filterValues,
    setFilterValues,
  }), [isAuthenticated, filterValues]);

  return (
    <div id="App">
      <ToastProvider>
        <GlobalContext.Provider value={contextValue}>
          {isLoading && <Loader />}
          <Router>
            <Header showRoutesNavigation={isAuthenticated} />
            <Switch>
              {isAuthenticated ? (
                <MainPage />
              ) : (
                <Route name={MainRoutes.Auth} exact>
                  <AuthPage />
                </Route>
              )}
            </Switch>
          </Router>
        </GlobalContext.Provider>
      </ToastProvider>
    </div>
  );
}

export default App;
