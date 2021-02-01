import './styles.scss';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import JogItemIcon from '../../../../assets/images/main/jog-item-icon.svg';
import { formatDate } from '../../../../core/utils/date';
import { calculateSpeedInKmH } from '../../../../core/utils/calculations';

interface JogItemProps {
  date: number,
  distance: number,
  id: number
  time: number
}

const JogItem: React.FC<JogItemProps> = ({ id, date, distance, time }) => {
  const [t] = useTranslation();
  const speed = useMemo(() => calculateSpeedInKmH(distance, time), [distance, time]);
  const formattedDate = useMemo(() => {
    const timeInMilliseconds = date * 1000;
    return formatDate(new Date(timeInMilliseconds));
  }, [date]);

  return (
    <div className="jog-item" data-jog-id={id}>
      <img
        src={JogItemIcon}
        alt="jog item"
        className="jog-item__icon"
      />
      <div className="jog-item__info-block">
        <div className="jog-item__date">
          {formattedDate}
        </div>
        <div className="jog-item__parameters">
          <div className="jog-item__parameter">
            <span className="parameter-key">
              {t('jogging.speed-text')}:
            </span>
            <span className="parameter-value">
              {` ${speed} ${t('jogging.speed-dimension')}`}
            </span>
          </div>
          <div className="jog-item__parameter">
            <span className="parameter-key">
              {t('jogging.distance-text')}:
            </span>
            <span className="parameter-value">
              {` ${distance} ${t('jogging.distance-dimension')}`}
            </span>
          </div>
          <div className="jog-item__parameter">
            <span className="parameter-key">
              {t('jogging.time-text')}:
            </span>
            <span className="parameter-value">
              {` ${time} ${t('jogging.time-dimension')}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JogItem;
