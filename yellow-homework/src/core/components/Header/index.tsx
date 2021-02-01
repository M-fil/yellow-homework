import './styles.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../../assets/images/header/logo.png';
import RoutesNavigation from './components/RoutesNavigation';
import FilterBlock from '../FilterBlock';
import * as JogService from '../../services/jogs';

interface HeaderProps {
  showRoutesNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showRoutesNavigation = false }) => {
  const filterValues = JogService.getFilterValues();
  const [t] = useTranslation();
  const [isFilterBlockVisible, setIsFilterBlockVisible] = useState<boolean>(!!filterValues?.isOpened);

  return (
    <>
      <header className="header">
        <div className="header__logo-container">
          <img
            src={LogoImage}
            alt="logo"
            className="header__logo-image"
          />
          <h1 className="header__logo-title">
            {t('header.logo-title')}
          </h1>
        </div>
        {showRoutesNavigation && (
          <RoutesNavigation
            setIsFilterBlockVisible={setIsFilterBlockVisible}
          />
        )}
        <FilterBlock isVisible={isFilterBlockVisible} />
      </header>
    </>
  );
};

export default Header;
