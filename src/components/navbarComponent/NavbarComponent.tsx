import React from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

import css from './Navbar.module.css';
import { appRoutes } from '../../router/appRoutes';
import { authService } from '../../services/auth.service';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const visibleAuth = '/auth'
  const visibleChat = '/chat'

  const isAuthVisible = visibleAuth.includes(location.pathname);
  const isChatVisible = visibleChat.includes(location.pathname);
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
          <li className={css.navbarItem}><a href="auth">Register/login</a></li>
          {isAuthVisible && (<li className={css.navbarItem}><a href="chat">Chat</a></li>)}
          {isChatVisible && (<li className={css.navbarItem} onClick={() => logout()}><a>Logout</a></li>)}
        </ul>
      </div>
    </nav>
  );
};

export { NavbarComponent };
