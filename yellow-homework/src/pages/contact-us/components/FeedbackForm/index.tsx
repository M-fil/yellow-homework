import './styles.scss';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';

import DefaultInput from '../../../../core/components/DefaultInput';
import DefaultButton from '../../../../core/components/Button';
import * as FeedbackService from '../../../../core/services/feedback';
import * as AuthService from '../../../../core/services/auth';

const mockFn = () => { };

const FeedbackForm: React.FC = () => {
  const token = AuthService.getSavedToken();
  const [t] = useTranslation();
  const [feedbackText, setFeedbackText] = useState<string>('');
  const { addToast } = useToasts();

  const onFeedbackValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFeedbackText(event.target.value);
  }, []);

  const onSubmitFeedback = useCallback((event: FormEvent) => {
    event.preventDefault();

    FeedbackService.submitFeedback(feedbackText, token)
      .then((data) => {
        if (data === 'success') {
          addToast(t('contact-us-page.success-feedback-submit'), {
            appearance: 'success', autoDismiss: true,
          });
        } else {
          addToast(data, {
            appearance: 'error', autoDismiss: true,
          });
        }
      })
  }, [feedbackText, token, addToast]);

  return (
    <form
      className="feedback-form"
      onSubmit={onSubmitFeedback}
    >
      <DefaultInput
        type="text"
        onChange={onFeedbackValueChange}
        extraClassName="feedback-form__input"
      />
      <DefaultButton
        text={t('contact-us-page.submit-feedback-text')}
        onClick={mockFn}
        extraClassName="feedback-form__submit-button"
      />
    </form>
  );
};

export default FeedbackForm;
