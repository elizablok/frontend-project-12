import React from 'react';
import { useTranslation } from 'react-i18next';
import getRoutes from '../../routes';
import image from '../../assets/404.svg';

const MissingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center h-100 overflow-hidden">
      <img src={image} alt={t('missingPage.notFound')} className="img-fluid h-25" />
      <h1>{t('missingPage.notFound')}</h1>
      <p className="text-muted">
        {t('missingPage.youCanVisit')}
        <a href={getRoutes.chatPage()}>{t('missingPage.mainPage')}</a>
      </p>
    </div>
  );
};

export default MissingPage;
