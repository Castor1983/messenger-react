import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <NavLink to={'auth'}>register</NavLink>
            <br/>
            <NavLink to={'auth'}>login</NavLink>
            <br/>
            <NavLink to={'auth'}>logout</NavLink>
            <br/>
            <NavLink to={'chat'}>chat</NavLink>
            <br/>
            <hr/>
        </div>
    );
};

export {HeaderComponent};
