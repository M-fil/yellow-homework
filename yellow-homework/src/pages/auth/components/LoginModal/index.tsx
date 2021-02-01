import './styles.scss';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import MediaQuery from 'react-responsive';

import BigBearImage from '../../../../assets/images/main/big-bear.png';
import MobileBigBearImage from '../../../../assets/images/main/mobile-bear-image.png';
import DefaultButton from '../../../../core/components/Button';
import * as AuthService from '../../../../core/services/auth';
import { GlobalContext } from '../../../../core/context/global';
import { ScreenWidths } from '../../../../core/constants/screen-width';

const LoginModal: React.FC = () => {
  const [t] = useTranslation();
  const globalContext = useContext(GlobalContext);
  const { addToast } = useToasts();

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
        addToast(error.message, { appearance: 'error', autoDismiss: true });
      })
      .finally(() => {
        globalContext.setIsLoading(false);
      });
  }, [globalContext, addToast]);

  return (
    <div className="login-modal">
      <MediaQuery minDeviceWidth={ScreenWidths.TabletWidth}>
        <div className="login-modal__container">
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
      </MediaQuery>
      <MediaQuery maxDeviceWidth={ScreenWidths.TabletWidth}>
        <img
          className="login-modal__image"
          src={MobileBigBearImage}
          alt="mobile-big-bear"
        />
        <DefaultButton
          text={t('auth.login-button-text')}
          onClick={onLoginClickHandler}
          extraClassName="login-modal__auth-button"
        />
      </MediaQuery>
    </div>
  );
};

export default LoginModal;
