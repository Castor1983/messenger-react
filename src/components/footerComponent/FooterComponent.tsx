import React from 'react';

import css from'./Footer.module.css';

const FooterComponent = () => {
  return (
    <footer className={ css.footer }>
      <div className={ css.footerContent }>
        <p>&copy; { new Date().getFullYear() }  Chat-messenger .All rights reserved.</p>
      </div>
    </footer>
  );
};

export { FooterComponent };
