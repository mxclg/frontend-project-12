import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const LogoutButton = () => {
  const { logOut } = useAuth();

  return (
    <Button variant="primary" onClick={logOut} className="ms-3">
      Выйти
    </Button>
  );
};

export default LogoutButton;