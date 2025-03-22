import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import LogoutButton from '../common/LogoutButton';
import routes from '../../routes/routes';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to={routes.chatPage()}>
          {t('ui.hexletChat')}
        </Navbar.Brand>
        {auth.loggedIn && <LogoutButton />}
      </div>
    </Navbar>
  );
};

export default Nav;