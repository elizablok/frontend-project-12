import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthn } from '../contexts/AuthnProvider';

const AuthnButton = () => {
  const { user, signOut } = useAuthn();
  const { t } = useTranslation();

  if (user) {
    return <Button variant="warning" onClick={signOut}>{t('signOut')}</Button>;
  }
  return null;
};

export default AuthnButton;
