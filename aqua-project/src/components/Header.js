import '../App.css';
import Logo from '../img/aquaLogo.png';

import { Icon } from '@iconify/react';
import React, { useEffect, useState, useRef } from "react";
import { NavLink } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


function Header(){
         
      /*PROFILE MENU  TOGGLE  */
        const [isOpen, setIsOpen] = useState(false);

          const toggleMenu = () => {
            setIsOpen(!isOpen);            
          };

        //  const menuRef = useRef();

        //  const handleOutsideClick = (event) => {
        //   if (menuRef.current && !menuRef.current.contains(event.target)) {
        //     setIsOpen(false);
        //   }
        // };
        //     useEffect(() => {
        //       document.addEventListener("mousedown", handleOutsideClick);
            
        //       return () => {
        //         document.removeEventListener("mousedown", handleOutsideClick);
        //       };
        //     }, []);

      /*  HAMBURGER TOGGLE */
      const [open, opened] = useState(false);

        const hamburger = () => {
          opened(!open); 
        };
        
      /*PROFILE MODAL */
        const [openProfileModal, setProfileModal] = useState(false);

        const profileModal = () =>{
          setProfileModal(!openProfileModal);
        };


      /*SIGN OUT MODAL**/
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
    return (
    <>
      <div className='nav_bar-container container-fluid'>
        <div class='ham_logo-container'>
          <div class="hamburger-menu" onClick={hamburger}>
            <div class={`hamburger ${open ? 'open' : ''}`}>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          </div>
          <div class="nb-logo">
              <img src={Logo} 
              width="64"
              height="64"
              className="d-inline-block align-top"
              alt="Aqua Logo"/>
          </div>
        </div>
        
          <ul className="nav-links">
              <li><NavLink to="/greenhousepage" activeClassName='active-link'  >Green House</NavLink></li>
              <li><NavLink to="/waterlevelpage" activeClassName='active-link' >Water Level</NavLink></li>
              <li><NavLink to="/waterconditionpage" activeClassName='active-link'>Water Condition</NavLink></li>
              <li><NavLink to="/devicespage" activeClassName='active-link'>Devices</NavLink></li>
          </ul>
         
          <div class="nav-buttons">
            <p>Keneth Canillas</p> 
              <div  >
                <button type="button" class="nav-btn" onClick={() => toggleMenu(!isOpen)}>
                    {<Icon icon="gg:profile" color="#f2f2f2" width="48" height="48" hFlip={true} />}
                </button>
              </div>
          </div>
          
                  {isOpen && (
                    <div class="toggle-nav_btn">
                      <ul class="toggle-links">
                        <li>
                        <a href="#" onClick={profileModal}><span>{<Icon icon="mdi:account" width="24" height="24"/>} </span>Profile</a>
                          {<Icon icon="material-symbols:arrow-forward-ios-rounded" />}
                        </li>
                        <li>
                          <a href="#"><span>{<Icon icon="circum:dark" width="24" height="24" />}</span>Theme</a>
                          </li>
                        <li id="signout">
                          <a href="#" onClick={handleShow}><span>{<Icon icon="ic:round-log-out" color="#900" width="24" height="24" />}</span>Sign out</a>
                          </li>
                    </ul>
                  </div>
                )}
      </div>
      {open &&(
         <div class="burger_drop-container">
            <ul class="burger-links">
              <li><NavLink to="/greenhousepage" activeClassName='active-link'  >Green House</NavLink></li>
              <li><NavLink to="/waterlevelpage" activeClassName='active-link' >Water Level</NavLink></li>
              <li><NavLink to="/waterconditionpage" activeClassName='active-link'>Water Condition</NavLink></li>
              <li><NavLink to="/devicespage" activeClassName='active-link'>Devices</NavLink></li>
            </ul>
         </div> 
      )}
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

          {openProfileModal &&(
            <div class='modal-container'>
            <div class='modal-title-row'>
                <p class='modal-title'>{<Icon icon="mdi:account" width="24" height="24"/>}<span class='text'>Profile</span></p>
                <button type='button' class='modal-close'>{<Icon icon="material-symbols:close-rounded" width="24" height="24"/>}Close</button>
            </div>
            <div class='modal-content'>
                <ul class='modal-content-column'>
                    <li>
                      <div class='first-content-container'>
                        <div class='first-content'>
                          <label>User ID</label>
                          <input  type='input'/>
                        </div>
                          <div class='modal-links'>
                            <p>Change Profile Information ? </p>
                            <p>Change Password ?  </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <label>Name</label>
                      <input  type='input'/>
                    </li>
                    <li>
                      <label>User Level</label>
                      <input  type='input'/>
                    </li>
                    <li>
                      <label>Birth Date</label>
                      <input  type='input'/>
                    </li>
                    <li>
                      <label>Email Address</label>
                      <input  type='input'/>
                    </li>
                </ul>
            </div>
        </div>
      )}
    </>
);
}
  export default Header;

