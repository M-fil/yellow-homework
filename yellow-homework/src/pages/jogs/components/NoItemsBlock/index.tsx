import './styles.scss';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import NoItemsImage from '../../../../assets/images/main/no-items.svg';
import DefaultButton from '../../../../core/components/Button';

interface NoItemsBlockProps {
  openCreateJogModal: () => void,
}

const NoItemsBlock: React.FC<NoItemsBlockProps> = ({ openCreateJogModal }) => {
  const [t] = useTranslation();

  const onCreateJogHandler = useCallback(() => {
    openCreateJogModal();
  }, [openCreateJogModal]);

  return (
    <div className="no-items-block">
      <div className="no-items-block__wrapper">
        <div className="no-items-block__content-block">
          <img
            src={NoItemsImage}
            alt="no-items-img"
            className="no-items-block__image"
          />
          <h3 className="no-items-block__text">
            {t('jogging.no-items-text')}
          </h3>
        </div>

        <DefaultButton
          text={t('jogging.create-jog-button-text')}
          extraClassName="no-items-block__create-jog-btn"
          onClick={onCreateJogHandler}
        />
      </div>
    </div>
  );
};

export default NoItemsBlock;
