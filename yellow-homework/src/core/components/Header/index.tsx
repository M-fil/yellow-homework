import './styles.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../../assets/images/header/logo.png';

const Header: React.FC = () => {
  const [t] = useTranslation();

  return (
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
    </header>
  );
};

export default Header;
