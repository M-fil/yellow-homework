import './styles.scss';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import BigBearImage from '../../../../assets/images/main/big-bear.png';
import DefaultButton from '../../../../core/components/Button';
import * as AuthService from '../../../../core/services/auth';
import { GlobalContext } from '../../../../core/context/global';

const LoginModal: React.FC = () => {
  const [t] = useTranslation();
  const globalContext = useContext(GlobalContext);

  const onLoginClickHandler = useCallback(() => {
    globalContext.setIsLoading(true);
    AuthService.loginUser()
      .then((data) => {
        if (data && data.error) {
          throw new Error(data.error);
        }

        globalContext.setIsAuthenticated(!!(data && data.token));
      })
      .catch((error: Error) => {
        console.log(error);
      })
      .finally(() => {
        globalContext.setIsLoading(false);
      });
  }, [globalContext]);

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
