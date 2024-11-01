import React from 'react';
import './Navbar.css';
const NavbarComponent = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Chat-messenger</h1>
                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="auth">Register/login</a></li>
                    <li className="navbar-item"><a href="chat">Chat</a></li>
                </ul>
            </div>
        </nav>
    );
};

export {NavbarComponent};
