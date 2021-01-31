import './styles.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DefaultInput from '../DefaultInput';

const FilterBlock: React.FC = () => {
  const [t] = useTranslation();

  return (
    <div className="filter-block">
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
