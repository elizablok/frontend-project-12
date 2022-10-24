import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoadingErrorButton = ({ loadingError, reloadHandler }) => {
  const { t } = useTranslation();
  return (
    <div className="row h-100 bg-white ">
      <p>{loadingError}</p>
      <Button onClick={reloadHandler}>{t('chat.errors.reload')}</Button>
    </div>
  );
};

export default LoadingErrorButton;
