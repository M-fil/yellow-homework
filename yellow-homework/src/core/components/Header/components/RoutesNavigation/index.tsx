import './styles.scss';
import React, { useCallback, useState, SetStateAction, Dispatch, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive'

import { ScreenWidths } from '../../../../constants/screen-width';
import FilterIcon from '../../../../../assets/images/header/filter-icon.svg';
import SelectedFilterIcon from '../../../../../assets/images/header/filter-icon-selected.svg';
import { routeLinks } from '../../constants/routes';
import BurgerButton from '../BurgerButton';
import BurgerMenu from '../../../BurgerMenu';
import { GlobalContext } from '../../../../context/global';
import * as JogService from '../../../../services/jogs';

interface RoutesNavigationProps {
  setIsFilterBlockVisible: Dispatch<SetStateAction<boolean>>,
}

const RoutesNavigation: React.FC<RoutesNavigationProps> = ({
  setIsFilterBlockVisible,
}) => {
  const [t] = useTranslation();
  const location = useLocation();
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState<boolean>(false);
  const { filterValues } = useContext(GlobalContext);
  const isFiltersApplied = useMemo(() => filterValues.from !== '', [filterValues.from]);

  const onOpenFilterBlock = useCallback(() => {
    setIsFilterBlockVisible((prevValue) => {
      JogService.setFilterValues({
        isOpened: !prevValue,
        fromDate: filterValues.from,
        toDate: filterValues.to,
      });

      return !prevValue;
    });
  }, [filterValues, setIsFilterBlockVisible]);

  const onOpenBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpened(true);
  }, []);

  const onCloseBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpened(false);
  }, []);

  return (
    <div className="routes-navigation">
      <BurgerMenu
        isOpened={isBurgerMenuOpened}
        closeMenu={onCloseBurgerMenu}
      />
      <MediaQuery minDeviceWidth={ScreenWidths.TabletWidth}>
        <div className="routes-navigation__list">
          {routeLinks.map((link) => {
            const isActive = location.pathname === link.route;
            const activeClassName = isActive
              ? 'routes-navigation__list-item_active'
              : '';

            return (
              <Link
                key={link.id}
                to={link.route}
                className={`routes-navigation__list-item ${activeClassName}`}
              >
                {t(link.translationLink).toUpperCase()}
              </Link>
            );
          })}
        </div>
      </MediaQuery>
      <button
        type="button"
        onClick={onOpenFilterBlock}
        className="filter-button"
      >
        <img
          src={isFiltersApplied ? SelectedFilterIcon : FilterIcon}
          alt="filter-icon"
          className="filter-button__icon"
        />
      </button>
      <MediaQuery maxDeviceWidth={ScreenWidths.TabletWidth}>
        <BurgerButton
          onClick={onOpenBurgerMenu}
          isBurgerMenuOpened={isBurgerMenuOpened}
        />
      </MediaQuery>
    </div>
  );
};

export default RoutesNavigation;
