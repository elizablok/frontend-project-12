import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoadSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center h-100 col-12">
      <Spinner animation="border" variant="primary" size="lg">
        <span className="visually-hidden">{t('chat.loading.title')}</span>
      </Spinner>
    </div>
  );
};

export default LoadSpinner;
