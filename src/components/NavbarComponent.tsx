import React from 'react';
import { requestServices } from '../services/api.service';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../router/appRoutes';
const NavbarComponent = () => {
    const navigate = useNavigate()
    const logout = async () => {
        const token = sessionStorage.getItem('token')
        if(token) {
            await requestServices.authService.logout(token);
            sessionStorage.clear()
        }
        return navigate(appRoutes.AUTH)

    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Chat-messenger</h1>
                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="auth">Register/login</a></li>
                    <li className="navbar-item"><a href="chat">Chat</a></li>
                    <li className="navbar-item" onClick={()=> logout()}><a>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export {NavbarComponent};
