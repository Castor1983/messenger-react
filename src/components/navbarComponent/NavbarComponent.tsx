
import React from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Navbar.module.css';
import { appRoutes } from '../../router/appRoutes';
import { authService } from '../../services/auth.service';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const token = sessionStorage.getItem('token');
    if(token) {
      await authService.logout(token);
      sessionStorage.clear();
    }
    return navigate(appRoutes.AUTH);

  };
  return (
    <nav className={ css.navbar }>
      <div className={ css.navbarContainer }>
        <h1 className={ css.navbarLogo }>Chat-messenger</h1>
        <ul className={ css.navbarMenu }>
          <li className={ css.navbarItem }><a href="auth">Register/login</a></li>
          <li className={ css.navbarItem }><a href="chat">Chat</a></li>
          <li className={ css.navbarItem } onClick={ () => logout() }><a>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export { NavbarComponent };
