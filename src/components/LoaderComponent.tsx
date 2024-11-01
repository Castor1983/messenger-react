import React from 'react';
import './Loader.css'; // Стили для компонента

const LoaderComponent: React.FC = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
};

export {LoaderComponent};
