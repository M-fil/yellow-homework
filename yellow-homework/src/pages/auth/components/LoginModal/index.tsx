import './styles.scss';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import BigBearImage from '../../../../assets/images/main/big-bear.png';
import DefaultButton from '../../../../core/components/Button';

const LoginModal: React.FC = () => {
  const [t] = useTranslation();

  const onLoginClickHandler = useCallback(() => {}, []);

  return (
    <div className="login-modal">
      <div className="login-modal__wrapper">
        <img
          className="login-modal__image"
          src={BigBearImage}
          alt="big-bear"
        />
        <DefaultButton
          text={t('auth.login-button-text')}
          onClick={onLoginClickHandler}
          extraClassName="login-modal__auth-button"
        />
      </div>
    </div>
  );
};

export default LoginModal;
