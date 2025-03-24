import { Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();

  return (
    <Button variant="primary" onClick={logOut} className="ms-3">
      {t('buttons.logOut')}
    </Button>
  );
};

export default LogoutButton;