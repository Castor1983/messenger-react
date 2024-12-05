import React from 'react';

import css from './Loader.module.css';

const LoaderComponent: React.FC = () => {
  return (
    <div className={ css.loaderContainer }>
      <div className={ css.loader } />
    </div>
  );
};

export { LoaderComponent };
