import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthProvider';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  if (user) {
    return <Button variant="warning" onClick={signOut}>{t('signOut')}</Button>;
  }
  return null;
};

export default AuthButton;
