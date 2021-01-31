import './styles.scss';
import React, { useEffect, useState } from 'react';

import NoItemsBlock from './components/NoItemsBlock';
import * as JogService from '../../core/services/jogs';
import * as AuthService from '../../core/services/auth';
import Loader from '../../core/components/Loader';
import JogItem from './components/JogItem';

const JogsPage: React.FC = () => {
  const token = AuthService.getSavedToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [jogs, setJogs] = useState<JogService.JogEntity[]>([]);

  useEffect(() => {
    setIsLoading(true);

    JogService.getAllJogs(token)
      .then((data) => {
        console.log('data', data);
        setJogs(data?.jogs || []);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div className="jogging-page">
      {isLoading && <Loader />}
      {(jogs.length === 0 && !isLoading) ? (
        <NoItemsBlock />
      ): (
        <div className="jogging-page__items">
          {jogs.map((jog) => {
            return (
              <JogItem
                key={jog.id}
                id={jog.id}
                date={jog.date}
                time={jog.time}
                distance={jog.distance}
              />
            )
          })}
        </div>
      )}
    </div>
  );
};

export default JogsPage;
