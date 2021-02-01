import './styles.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import ContactUsPage from '../contact-us';
import InfoPage from '../info';
import JogsPage from '../jogs';
import { MainRoutes } from '../../core/constants/routes';
import * as JogService from '../../core/services/jogs';
import * as AuthService from '../../core/services/auth';
import { sortJogsByDate } from '../../core/utils/sort';

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jogs, setJogs] = useState<JogService.JogEntity[]>([]);
  const token = AuthService.getSavedToken();
  const { addToast } = useToasts();

  useEffect(() => {
    setIsLoading(true);

    JogService.getAllJogs(token)
      .then((data) => {
        const sortedJogs = (data.jogs || []).sort(sortJogsByDate);
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

  const updateJogs = useCallback((newJog: JogService.JogEntity) => {
    setJogs((prevJogs) => ([...prevJogs, newJog].sort(sortJogsByDate)));
  }, [setJogs]);

  return (
    <main id="main-block">
      <Route path={[MainRoutes.Jogs, MainRoutes.Main]} exact>
        <JogsPage
          jogs={jogs}
          isJogsLoading={isLoading}
          updateJogs={updateJogs}
        />
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
