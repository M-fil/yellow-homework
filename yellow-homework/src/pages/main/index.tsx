import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import ContactUsPage from '../contact-us';
import InfoPage from '../info';
import JogsPage from '../jogs';
import { MainRoutes } from '../../core/constants/routes';
import * as JogService from '../../core/services/jogs';
import * as AuthService from '../../core/services/auth';

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jogs, setJogs] = useState<JogService.JogEntity[]>([]);
  const token = AuthService.getSavedToken();
  const { addToast } = useToasts();

  useEffect(() => {
    setIsLoading(true);

    JogService.getAllJogs(token)
      .then((data) => {
        const sortedJogs = (data.jogs || []).sort((a, b) => b.date - a.date);
        setJogs(sortedJogs);
      })
      .catch((error: Error) => {
        addToast(error.message, {
          appearance: 'error',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [addToast, token]);

  return (
    <main id="main-block">
      <Route path={[MainRoutes.Jogs, MainRoutes.Main]} exact>
        <JogsPage jogs={jogs} isJogsLoading={isLoading} />
      </Route>
      <Route path={MainRoutes.Info}>
        <InfoPage />
      </Route>
      <Route path={MainRoutes.ContactUs}>
        <ContactUsPage />
      </Route>
    </main>
  );
};

export default MainPage;
