import './styles.scss';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CreateIcon from '../../../../assets/images/main/create.svg';
import DefaultButton from '../../../../core/components/Button';
import DefaultInput from '../../../../core/components/DefaultInput';
import CloseButton from '../../../../core/components/Button/close-button';
import WhiteCloseIcon from '../../../../assets/images/main/white-close-icon.svg';
import { formatDate } from '../../../../core/utils/date';

interface FormValues {
  distance: number,
  time: number,
  date: number,
}

interface CreateJogModalProps {
  isEditing?: boolean
}

const mockFn = () => {};

const CreateJogModal: React.FC<CreateJogModalProps> = ({ isEditing }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    distance: 0,
    time: 0,
    date: 0,
  });
  const [t] = useTranslation();
  const minimumDateValue = formatDate(new Date(Date.now()), true, '-');

  console.log(minimumDateValue);
  const onFormValueChange = useCallback((name: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((state) => {
      const value = event.target.value;
      let date = 0;
      if (name === 'date') {
        date = Date.parse(new Date(value).toString());
      }

      return {
        ...state,
        [name]: name === 'date' ? date : Number(value),
      }
    })
  }, []);

  const onFormSubmitHandler = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  const onCloseModal = useCallback(() => {}, []);

  console.log('formValues', formValues);
  return (
    <>
      <button
        type="button"
        className="create-jog-btn"
      >
        <img
          src={CreateIcon}
          alt="create-btn"
          className="create-jog-icon"
        />
      </button>
      <div className="jog-modal-overlay">
        <form
          className="jog-modal"
          onSubmit={onFormSubmitHandler}
        >
          <div className="jog-modal__header">
            <CloseButton
              closeFn={onCloseModal}
              icon={WhiteCloseIcon}
              extraClassName="jog-modal__close-button"
            />
          </div>
          <DefaultInput 
            type="number"
            extraClassName="jog-modal__label"
            onChange={onFormValueChange('distance')}
            value={formValues.distance}
            labelText={t('jogging.distance-text')}
            min="1"
          />
          <DefaultInput 
            type="number"
            extraClassName="jog-modal__label"
            onChange={onFormValueChange('time')}
            value={formValues.time}
            labelText={t('jogging.time-text')}
            min="1"
          />
          <DefaultInput 
            type="date"
            extraClassName="jog-modal__label"
            onChange={onFormValueChange('date')}
            labelText={t('jogging.date-text')}
            max={minimumDateValue}
          />
          <DefaultButton
            text={t('jogging.save-jog-text')}
            type="submit"
            onClick={mockFn}
            extraClassName="jog-modal__submit-button"
          />
        </form>
      </div>
    </>
  );
}

export default CreateJogModal;
