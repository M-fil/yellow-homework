import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import BurgerMenuLogo from '../../../assets/images/header/burger-menu-logo.png';
import CloseIcon from '../../../assets/images/header/close.svg';
import { routeLinks } from '../Header/constants/routes';

interface BurgerMenuProps {
  closeMenu: () => void,
  isOpened: boolean,
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ closeMenu, isOpened }) => {
  const [t] = useTranslation();
  const location = useLocation();
  const activeClassName = useMemo(() => isOpened ? 'burger-menu_opened' : '', [isOpened]);

  const onLinkClickHandler = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <div className={`burger-menu ${activeClassName}`}>
      <div className="burger-menu__wrapper">
        <div className="burger-menu__header">
          <div className="burger-menu__title-block">
            <img
              src={BurgerMenuLogo}
              alt="burger-menu-logo"
              className="burger-menu__logo-image"
            />
            <h2 className="burger-menu__title">
              {t('header.logo-title')}
            </h2>
          </div>
          <button
            type="button"
            className="burger-menu__close-button"
            onClick={closeMenu}
          >
            <img
              src={CloseIcon}
              alt="close-icon"
              className="burger-menu__close-icon"
            />
          </button>
        </div>
        <div className="burger-menu__links">
          {routeLinks.map((link) => {
            const activeClassName = (link.route === location.pathname)
              ? 'burger-menu__link_active'
              : '';

            return (
              <Link
                key={link.id}
                to={link.route}
                className={`burger-menu__link ${activeClassName}`}
                onClick={onLinkClickHandler}
              >
                {t(link.translationLink).toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
