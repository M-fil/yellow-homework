import React from 'react';
import { Route } from 'react-router-dom';

import ContactUsPage from '../contact-us';
import InfoPage from '../info';
import JogsPage from '../jogs';
import { MainRoutes } from '../../core/constants/routes';

const MainPage: React.FC = () => {  
  return (
    <>
      <Route path={[MainRoutes.Jogs, MainRoutes.Main]} exact>
        <JogsPage />
      </Route>
      <Route path={MainRoutes.Info}>
        <InfoPage />
      </Route>
      <Route path={MainRoutes.ContactUs}>
        <ContactUsPage />
      </Route>
    </>
  );
};

export default MainPage;
