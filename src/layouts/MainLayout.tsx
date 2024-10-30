import React from 'react';
import {Outlet} from "react-router-dom";
import {NavbarComponent} from "../components/NavbarComponent";
import {FooterComponent} from "../components/FooterComponent";

const MainLayout = () => {
    return (
        <div>
            <NavbarComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
};

export {MainLayout};
