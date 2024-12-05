import React from 'react';
import { Outlet } from 'react-router-dom';

import { FooterComponent } from '../components/footerComponent/FooterComponent';
import { NavbarComponent } from '../components/navbarComponent/NavbarComponent';

const MainLayout = () => {
  return (
    <div>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponent/>
    </div>
  );
};

export { MainLayout };
