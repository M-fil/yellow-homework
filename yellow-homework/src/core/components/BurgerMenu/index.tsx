import './styles.scss';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

import BurgerMenuLogo from '../../../assets/images/header/burger-menu-logo.png';
import { routeLinks } from '../Header/constants/routes';
import { ScreenWidths } from '../../constants/screen-width';
import CloseButton from '../Button/close-button';
import { MainRoutes } from '../../constants/routes';

interface BurgerMenuProps {
  closeMenu: () => void,
  isOpened: boolean,
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ closeMenu, isOpened }) => {
  const [t] = useTranslation();
  const location = useLocation();
  const activeClassName = useMemo(() => isOpened ? 'burger-menu_opened' : '', [isOpened]);
  const isTabletWidth = useMediaQuery({ maxDeviceWidth: ScreenWidths.TabletWidth });

  useEffect(() => {
    if (!isTabletWidth) {
      closeMenu();
    }
  }, [isTabletWidth, closeMenu]);

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
          <CloseButton
            closeFn={closeMenu}
            extraClassName="burger-menu__close-button"
          />
        </div>
        <div className="burger-menu__links">
          {routeLinks.map((link) => {
            const { pathname } = location;
            const isActive = (pathname === link.route)
              || ((pathname === '' || pathname === '/') && link.route === MainRoutes.Jogs);
            const activeClassName = isActive
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
