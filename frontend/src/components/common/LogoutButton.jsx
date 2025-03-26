import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

const LogoutButton = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();

  return (
    <Button variant="primary" onClick={logOut}>
      {t('buttons.logOut')}
    </Button>
  );
};

export default LogoutButton;
