import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import LogoutButton from '../common/LogoutButton';
import routes from '../../routes/routes';
import useAuth from '../../hooks/useAuth';


const Nav = () => {
    const auth = useAuth();
    return (
      <Navbar className="shadow-sm bg-white" expand="lg">
        <div className="container">
          <Navbar.Brand as={Link} to={routes.chatPage()}>Hexlet Chat</Navbar.Brand>
          {auth.loggedIn && <LogoutButton />} {/* Используем готовый компонент */}
        </div>
      </Navbar>
    );
  };
  
  export default Nav;