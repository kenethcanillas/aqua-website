import '../App.css';
import Logo from '../img/aquaLogo.png';
import { Icon } from '@iconify/react';
import React, { useEffect, useState, useRef } from "react";

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



function Header(){
         const [isOpen, setIsOpen] = useState(false);
         const [open, opened] = useState(false);

         const toggleMenu = () => {
           setIsOpen(!isOpen);
         };

         const menuRef = useRef();

         const handleOutsideClick = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
        useEffect(() => {
          document.addEventListener("mousedown", handleOutsideClick);
        
          return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
          };
        }, []);

        const hamburger = () => {
          opened(!open); 
        };
        

        
    return (
    <>
      <div class="nav_bar-container">
        <div class='ham_logo-container'>
          <div className="hamburger-menu" onClick={hamburger}>
            <div className={`hamburger ${open ? 'open' : ''}`}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <div class="nb-logo">
              <img src={Logo} alt="Aqua Logo" width="64" height="64"/>
          </div>
        </div>
        
          <ul class="nav-links">
              <li><NavLink to="/greenhousepage" activeClassName='active-link'  >Green House</NavLink></li>
              <li><NavLink to="/" activeClassName='active-link' >Water Level</NavLink></li>
              <li><NavLink to="/waterconditionpage" activeClassName='active-link'>Water Condition</NavLink></li>
              <li><NavLink to="/a" activeClassName='active-link'>Devices</NavLink></li>
          </ul>
         
          <div class="nav-buttons">
            <p>Keneth Canillas</p> 
              <div>
                <button type="button" ref={menuRef} class="nav-btn" onClick={() => toggleMenu(!isOpen)}>
                    {<Icon icon="gg:profile" color="#f2f2f2" width="48" height="48" hFlip={true} />}
                </button>
              </div>
          </div>
          
                  {isOpen && (
                    <div class="toggle-nav_btn">
                      <ul class="toggle-links">
                        <li>
                          <a href="#"><span>{<Icon icon="mdi:account" width="24" height="24"/>} </span>Profile</a>
                          {<Icon icon="material-symbols:arrow-forward-ios-rounded" />}
                        </li>
                        <li>
                          <a href="#"><span>{<Icon icon="circum:dark" width="24" height="24" />}</span>Theme</a>
                          </li>
                        <li id="signout">
                          <a href="#"><span>{<Icon icon="ic:round-log-out" color="#900" width="24" height="24" />}</span>Sign out</a>
                          </li>
                    </ul>
                  </div>
                )}
      </div>
      {open &&(
         <div class="burger_drop-container">
            <ul class="burger-links">
              <li><NavLink to="/greenhousepage" activeClassName='active-link'  >Green House</NavLink></li>
              <li><NavLink to="/b" activeClassName='active-link' >Water Level</NavLink></li>
              <li><NavLink to="/waterconditionpage" activeClassName='active-link'>Water Condition</NavLink></li>
              <li><NavLink to="/a" activeClassName='active-link'>Devices</NavLink></li>
            </ul>
         </div> 
      )}

    </>
);
}
  export default Header;

