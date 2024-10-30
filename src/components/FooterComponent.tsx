import React from 'react';
import './Footer.css';

const FooterComponent = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()}  Chat-messenger .All rights reserved.</p>
            </div>
        </footer>
    );
};

export {FooterComponent};
