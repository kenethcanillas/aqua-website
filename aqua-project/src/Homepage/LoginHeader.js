import '../App.css';
import { Icon } from "@iconify/react";
import { NavLink, Navigate } from "react-router-dom";


import React, {useCallback, useEffect, useRef, useState} from 'react';

function LoginHeader(){

    return(
    <>
        <nav className='log-nav-container px-2'>
            <NavLink to="/home" className="active-link">
                <p className='log-nav-home'>{<Icon icon="material-symbols:home-rounded" width='32' height='32'/>} 
                <span className='Home'>Home</span></p>
            </NavLink>
                    <div className='log-nav'>
                        <NavLink to="/instructions" className="active-link">
                            <button className='use'> Instruction</button>
                        </NavLink>
                        <NavLink to="/" className='active-link'>
                            <button className='sign'>Sign up</button>
                        </NavLink>
                    </div>
        </nav>
    </>

    );

}
export default LoginHeader;