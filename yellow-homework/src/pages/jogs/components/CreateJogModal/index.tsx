import './styles.scss';
import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';

import DefaultButton from '../../../../core/components/Button';
import DefaultInput from '../../../../core/components/DefaultInput';
import CloseButton from '../../../../core/components/Button/close-button';
import WhiteCloseIcon from '../../../../assets/images/main/white-close-icon.svg';
import { formatDate } from '../../../../core/utils/date';
import * as JogService from '../../../../core/services/jogs';
import * as AuthService from '../../../../core/services/auth';

interface FormValues {
  distance: number,
  time: number,
  date: string,
}

interface CreateJogModalProps {
  isOpened: boolean,
  closeModal: () => void,
}

const mockFn = () => { };
const currentDate = formatDate(new Date(Date.now()), true, '-');

const CreateJogModal: React.FC<CreateJogModalProps> = ({ isOpened, closeModal }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    distance: 1,
    time: 1,
    date: '',
  });
  const [t] = useTranslation();
  const openedClassName = useMemo(() => isOpened ? 'jog-modal-overlay_opened' : '', [isOpened]);
  const { addToast } = useToasts();

  const onFormValueChange = useCallback((name: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((state) => {
      const value = event.target.value;

      return {
        ...state,
        [name]: name === 'date' ? value : Number(value),
      };
    });
  }, []);

  const onFormSubmitHandler = useCallback((event: FormEvent) => {
    event.preventDefault();

    const token = AuthService.getSavedToken();
    const newJog: JogService.JogRequestBody = { ...formValues };

    JogService.createNewJog(token, newJog)
      .then((data) => {
        if (data === 'success') {
          const message = t('messages.create-jog-success');
          addToast(message, { appearance: 'success', autoDismiss: true });
          closeModal();
        } else {
          addToast(data, { appearance: 'error', autoDismiss: true });
        }
      })
  }, [formValues, t, addToast, closeModal]);

  const onCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <div className={`jog-modal-overlay ${openedClassName}`}>
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
          max={currentDate}
        />
        <DefaultButton
          text={t('jogging.save-jog-text')}
          type="submit"
          onClick={mockFn}
          extraClassName="jog-modal__submit-button"
        />
      </form>
    </div>
  );
}

export default CreateJogModal;
