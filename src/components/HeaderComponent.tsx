import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <NavLink to={'register'}>register</NavLink>
            <br/>
            <NavLink to={'login'}>login</NavLink>
            <br/>
            <NavLink to={'posts'}>logout</NavLink>
            <br/>
            <NavLink to={'chat'}>chat</NavLink>
            <br/>
            <hr/>
        </div>
    );
};

export {HeaderComponent};
