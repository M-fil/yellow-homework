import './styles.scss';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MainRoutes } from '../../../../constants/routes';
import FilterIcon from '../../../../../assets/images/header/filter-icon.svg';

const RoutesNavigation: React.FC = () => {
  const [t] = useTranslation();

  const onOpenFilterBlock = useCallback(() => {
    console.log('filter');
  }, []);

  return (
    <div className="routes-navigation">
      <div className="routes-navigation__list">
        <Link
          to={MainRoutes.Jogs}
          className="routes-navigation__list-item"
        >
          {t('header.routes.jogs').toUpperCase()}
        </Link>
        <Link
          to={MainRoutes.Info}
          className="routes-navigation__list-item"
        >
          {t('header.routes.info').toUpperCase()}
        </Link>
        <Link
          to={MainRoutes.ContactUs}
          className="routes-navigation__list-item"
        >
          {t('header.routes.contact-us').toUpperCase()}
        </Link>
      </div>
      <button
        type="button"
        onClick={onOpenFilterBlock}
        className="filter-button"
      >
        <img
          src={FilterIcon}
          alt="filter-icon"
          className="filter-button__icon"
        />
      </button>
    </div>
  );
};

export default RoutesNavigation;
