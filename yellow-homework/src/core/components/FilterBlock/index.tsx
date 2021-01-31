import './styles.scss';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultInput from '../DefaultInput';

interface FilterBlockProps {
  isVisible: boolean,
}

const FilterBlock: React.FC<FilterBlockProps> = ({ isVisible }) => {
  const [t] = useTranslation();
  const openedClassName = useMemo(() => isVisible ? 'filter-block_opened' : '', [isVisible]);

  return (
    <div className={`filter-block ${openedClassName}`}>
      <div className="filter-block__wrapper">
        <DefaultInput
          type="date"
          labelText={t('header.filter.from-btn-text')}
          extraClassName="filter-block__label"
        />
        <DefaultInput
          type="date"
          labelText={t('header.filter.to-btn-text')}
          extraClassName="filter-block__label"
        />
      </div>
    </div>
  );
};

export default FilterBlock;
