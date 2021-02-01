import './styles.scss';
import React, { useCallback, useEffect, useState, useContext } from 'react';

import NoItemsBlock from './components/NoItemsBlock';
import * as JogService from '../../core/services/jogs';
import Loader from '../../core/components/Loader';
import JogItem from './components/JogItem';
import CreateJogModal from './components/CreateJogModal';
import CreateJogButton from './components/CreateJogButton';
import { GlobalContext } from '../../core/context/global';
import { filterByDatesInRange, formatDate } from '../../core/utils/date';

const currentDate = formatDate(new Date(Date.now()), true, '-');

interface JogsPageProps {
  jogs: JogService.JogEntity[],
  isJogsLoading: boolean,
}

const JogsPage: React.FC<JogsPageProps> = ({ jogs, isJogsLoading }) => {
  const [isCreateJogModalOpened, setIsCreateJogModalOpened] = useState<boolean>(false);
  const [jogsToShow, setJogsToShow] = useState<JogService.JogEntity[]>([]);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (jogs.length > 0) {
      setJogsToShow(jogs);
    }
  }, [jogs]);

  useEffect(() => {
    if (!isJogsLoading) {
      const { from, to } = globalContext.filterValues;
      const filteredJogs = filterByDatesInRange<JogService.JogEntity>(
        from, to || currentDate, jogs,
      );
      setJogsToShow(filteredJogs);
    }
  }, [globalContext.filterValues, isJogsLoading, jogs]);

  const onOpenCreateJogModal = useCallback(() => {
    setIsCreateJogModalOpened(true);
  }, []);

  const onCloseCreateJogModal = useCallback(() => {
    setIsCreateJogModalOpened(false);
  }, []);

  return (
    <div className="jogging-page">
      <CreateJogButton
        onClick={onOpenCreateJogModal}
      />
      <CreateJogModal
        isOpened={isCreateJogModalOpened}
        closeModal={onCloseCreateJogModal}
      />
      {isJogsLoading && <Loader />}
      {(jogsToShow.length === 0 && !isJogsLoading) ? (
        <NoItemsBlock openCreateJogModal={onOpenCreateJogModal} />
      ) : (
        <div className="jogging-page__items">
          {jogsToShow.map((jog) => {
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
