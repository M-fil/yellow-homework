import './styles.scss';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const InfoPage: React.FC = () => {
  const [t] = useTranslation();
  const textArray = useMemo((): string[] => t('info-page.text', { returnObjects: true }), [t]);

  return (
    <div className="info-page">
      <div className="info-page__wrapper">
        <h2 className="info-page__title">
          {t('info-page.title').toUpperCase()}
        </h2>
        <div className="info-page__text-block">
          {textArray.map((textItem) => (
            <p
              className="info-page__text-item"
              key={textItem}
            >
              {textItem}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
