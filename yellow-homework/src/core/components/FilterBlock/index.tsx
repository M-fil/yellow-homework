import './styles.scss';
import React, { ChangeEvent, useCallback, useMemo, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultInput from '../DefaultInput';
import { formatDate } from '../../../core/utils/date';
import { GlobalContext } from '../../context/global';
import * as JogService from '../../services/jogs';

interface FilterBlockProps {
  isVisible: boolean,
}

interface DateValues {
  from: string;
  to: string;
}

const currentDate = formatDate(new Date(Date.now()), true, '-');

const FilterBlock: React.FC<FilterBlockProps> = ({ isVisible }) => {
  const filterValues = JogService.getFilterValues();
  const [t] = useTranslation();
  const openedClassName = useMemo(() => isVisible ? 'filter-block_opened' : '', [isVisible]);
  const [dateValues, setDateValues] = useState<DateValues>({
    from: filterValues?.fromDate || '',
    to: filterValues?.toDate || '',
  });
  const globalContext = useContext(GlobalContext);

  const onDateValueChange = useCallback((name: keyof DateValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setDateValues((prevState) => {
      const newValues = {
        ...prevState,
        [name]: event.target.value,
      };
      globalContext.setFilterValues(newValues);

      return newValues;
    });
  }, [globalContext]);

  useEffect(() => {
    JogService.setFilterValues({
      isOpened: isVisible,
      fromDate: dateValues.from,
      toDate: dateValues.to,
    });
  }, [isVisible, dateValues]);

  return (
    <div className={`filter-block ${openedClassName}`}>
      <div className="filter-block__wrapper">
        <DefaultInput
          type="date"
          labelText={t('header.filter.from-btn-text')}
          extraClassName="filter-block__label"
          onChange={onDateValueChange('from')}
          max={currentDate}
          value={dateValues.from}
        />
        <DefaultInput
          type="date"
          labelText={t('header.filter.to-btn-text')}
          extraClassName="filter-block__label"
          onChange={onDateValueChange('to')}
          min={dateValues.from}
          max={currentDate}
          value={dateValues.to}
        />
      </div>
    </div>
  );
};

export default FilterBlock;
