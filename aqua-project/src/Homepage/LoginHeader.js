import '../App.css';
import { Icon } from "@iconify/react";
import { NavLink, Navigate } from "react-router-dom";


import React, {useCallback, useEffect, useRef, useState} from 'react';

function LoginHeader(){

    return(
    <>
        <nav className='log-nav-container'>
            <NavLink to="/home" className="active-link">
                <p className='log-nav-home'>{<Icon icon="material-symbols:home-rounded" width='32' height='32'/>} 
                <span className='Home'>Home</span></p>
            </NavLink>
                    <div className='log-nav'>
                        <NavLink to="/infographics" className="active-link">
                            <button className='use'> Info Graphics</button>
                        </NavLink>
                        <NavLink to="/" className='active-link'>
                            <button className='sign'>Sign in</button>
                        </NavLink>
                    </div>
        </nav>
    </>
    );

}
export default LoginHeader;