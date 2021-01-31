import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContactUsPage from '../contact-us';
import InfoPage from '../info';
import JogsPage from '../jogs';
import { MainRoutes } from '../../core/constants/routes';

const MainPage: React.FC = () => {
  return (
    <BrowserRouter basename={MainRoutes.Main}>
      <Switch>
        <Route path={[MainRoutes.Jogs, MainRoutes.Main]}>
          <JogsPage />
        </Route>
        <Route path={MainRoutes.Info}>
          <InfoPage />
        </Route>
        <Route path={MainRoutes.ContactUs}>
          <ContactUsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default MainPage;
