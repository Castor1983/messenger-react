import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div>
            <NavLink to={'/'}>home page</NavLink>
            <br/>
            <NavLink to={'users'}>users page</NavLink>
            <br/>
            <NavLink to={'posts'}>posts page</NavLink>
            <br/>
            <NavLink to={'todos'}>todos page</NavLink>
            <br/>
            <NavLink to={'albums'}>albums page</NavLink>
            <br/>
            <NavLink to={'photos'}>photos page</NavLink>
            <br/>
            <NavLink to={'comments'}>comments page</NavLink>
            <hr/>
        </div>
    );
};

export {HeaderComponent};
