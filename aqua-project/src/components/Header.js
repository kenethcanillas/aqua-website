import '../App.css';
import Logo from '../img/aquaLogo.png';

import { Icon } from '@iconify/react';
import React, { useState } from "react";
import { NavLink, Navigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/AuthContext';


function Header(){
  const {logout} = useAuth();
  const signOut = () =>{
    logout();
    CMbtnClose();
    <Navigate to="/login"/>

  }
         
      /*  HAMBURGER TOGGLE */
      const [open, opened] = useState(false);

        const hamburger = () => {
          opened(!open); 
        };
    


        function ProfileModal(props) {
          return (
            <Modal {...props}
              size="lg"
              backdrop="static"
              aria-labelledby="contained-modal-title-vcenter"
              centered 
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <span className='px-2' >{<Icon icon="mdi:account" width="24" height="24"/>}</span> 
                    Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className='profile-reverse'>
                    <Col lg={6} xs={12}>
                      <ul className='modal-content-column'>
                        <li>
                            <label>User ID</label>
                            <input  type='input' placeholder='20-1234' disabled/>
                        </li>
                        <li>
                          <label>Name</label>
                          <input  type='input' placeholder='John Doe' disabled/>
                        </li>
                        <li>
                          <label>User Level</label>
                          <input  type='input' placeholder='Member' disabled/>
                        </li>
                        <li>
                          <label>Email Address</label>
                          <input  type='input' placeholder='johndoe@gmail.com' disabled/>

                        </li>
                      </ul> 
                    </Col>
                    <Col lg={6} xs={12} className='modal-links '>
                      <ul className='modal-content-column'>
                        <li>
                          <a href="#/changeprofile"  onClick={() => setEditProfileModalShow(true)}>Change Profile Information ? </a>
                          <a href="#/changepassword"  onClick={() => setChangePasswordModalShow(true)}>Change Password ?  </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
            </Modal>
          );
        }

        const [ProfileModalShow, setProfileModalShow] = React.useState(false);

        // EDIT PROFILE INFORMATION 
const disableBG = {
  backgroundColor :'#e8e8e8'
};

        function EditProfileModal(props) {
          return (
            <Modal 
            {...props}
                size="lg"
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <span className='px-2' ><Icon icon="material-symbols:edit-square-outline-rounded" width='24px' height='24px' /></span> Edit Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className='profile-reverse'>
                    <Col lg={6} xs={12}>
                      <ul className='modal-content-column'>
                        <li>
                            <label>User ID</label>
                            <input  type='input' placeholder='20-1234' disabled style={disableBG}/>
                        </li>
                        <li>
                          <label>Name</label>
                          <input  type='input' placeholder='John Doe'/>
                        </li>
                        <li>
                          <label>User Level</label>
                          <input  type='input' placeholder='Member' disabled style={disableBG}/>
                        </li>
                        <li>
                          <label>Email Address</label>
                          <input  type='input' placeholder='johndoe@gmail.com' />
                        </li>
                      
                      </ul> 
                    </Col>
                    <Col lg={6} xs={12} className='modal-links '>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='light' className='modalSaveBtn py-3 ' onClick={props.onHide}>Cancel</Button>
                <Button variant='success' className='modalSaveBtn py-3 px-5 ' onClick={props.onHide}>Save</Button>
              </Modal.Footer>
            </Modal>
          );
        }

        const [EditProfileModalShow, setEditProfileModalShow] = React.useState(false);

        /* CHANGE PASSWORD */
        function ChangePasswordModal(props) {
          return (
            <Modal
              {...props}
              size="lg"
              backdrop="static"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <span className='px-2' ><Icon icon="material-symbols:edit-square-outline-rounded" width='24px' height='24px' /></span> Change Password
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className='profile-reverse'>
                    <Col lg={6} xs={12}>
                      <ul className='modal-content-column'>
                        <li>
                          <label>Type Old Password</label>
                          <input  type='input'/>
                        </li>
                        <li>
                          <label>Type New Password</label>
                          <input  type='input'/>
                        </li>
                        <li>
                          <label>Re-type New Password</label>
                          <input  type='input'/>
                        </li>
                        <li>
                          <label></label>
                          <label></label>
                        </li>
                      </ul> 
                    </Col>
                    <Col lg={6} xs={12} className='modal-links '>
                    </Col>
                  </Row>
                </Container>
                </Modal.Body>
                  <Modal.Footer>
                <Button variant='light' className='modalSaveBtn py-3 ' onClick={props.onHide}>Cancel</Button>
                <Button variant='success' className='modalSaveBtn py-3 px-5 ' onClick={props.onHide}>Save</Button>
              </Modal.Footer>
            </Modal>
          );
        }
        const [ChangePasswordModalShow, setChangePasswordModalShow] = React.useState(false);
       

          // THEME BUTTON && MODAL
            const [themeBtnCheck, themeBtnIsChecked] = useState(false);

            const themeBtn = () => {
              themeBtnIsChecked(!themeBtnCheck);
            };

            const [themeModal, themeSetShow] = useState(false);

            const themebtnClose = () => themeSetShow(false);
            const themebtnShow = () => themeSetShow(true);


      /*SIGN OUT MODAL**/
      const [closeModal, CMsetShow] = useState(false);

      const CMbtnClose = () => CMsetShow(false);
      const CMbtnShow = () => CMsetShow(true);

    // /*Confirm PAssword  Modal**/
    // function ConfirmPass(props) {
    //   return (
    //     <Modal 
    //       {...props}
    //       size="sm"
    //       backdrop="static"
    //       position="initial"
    //       >
    //       <Modal.Header>
    //       </Modal.Header>
    //       <Modal.Body>
    //           <p>Save Changes </p>
    //       </Modal.Body>
    //       <Modal.Footer>
    //              <Button variant='light' className='modalSaveBtn py-3 ' onClick={props.onHide}>Cancel</Button>
    //             <Button variant='success' className='modalSaveBtn py-3 px-5 ' onClick={setconfirmPassShow(false)}>Save</Button>
    //       </Modal.Footer>
    //     </Modal>
    //   );
    // }
      
    // const [confirmPassShow, setconfirmPassShow] = React.useState(false);

    return (
    <>
      <ProfileModal
        show={ProfileModalShow}
        onHide={() => setProfileModalShow(false)}
      />

        <EditProfileModal
        show={EditProfileModalShow}
        onHide={() => setEditProfileModalShow(false)}

      />
      
      <ChangePasswordModal
        show={ChangePasswordModalShow}
        onHide={() => setChangePasswordModalShow(false)}
      />

       {/* <ConfirmPass
        show={confirmPassShow}
        onHide={() => setconfirmPassShow(false)}
      /> */}

      <Modal
        show={themeModal}
        onHide={themebtnClose}
        backdrop="static"
        keyboard={false} >
        
          <Modal.Header closeButton>
            <Modal.Title>Theme</Modal.Title>
          </Modal.Header>
          <Modal.Body className='theme-body'> 
          <p >Dark Mode  :</p>
            <label class="switch" > 
                  <input type="checkbox" checked={themeBtnCheck} onClick={themeBtn}/><span class="slider round"/> 
              </label>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={themebtnClose}>
                Cancel
              </Button>
              <Button variant="success" onClick={themebtnClose}>
                Save
              </Button>
            </Modal.Footer>
      </Modal>
      
      
      <Modal
        show={closeModal}
        onHide={CMbtnClose}
        backdrop="static"
        keyboard={false} >
        
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Continue to Sign out?
          </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={CMbtnClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={signOut}>
                Sign out
              </Button>
            </Modal.Footer>
      </Modal>

      <div className=' nav_bar-container '>
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
              <li><NavLink to="/" activeClassName='active-link'  >Green House</NavLink></li>
              <li><NavLink to="/waterlevelpage" activeClassName='active-link' >Water Level</NavLink></li>
              <li><NavLink to="/waterconditionpage" activeClassName='active-link'>Water Condition</NavLink></li>
              <li><NavLink to="/devicespage" activeClassName='active-link'>Devices</NavLink></li>
          </ul>
      
          <Dropdown className='nav-buttons'>
            <Dropdown.ItemText className='name px-2'>John Doe</Dropdown.ItemText>
              <Dropdown.Toggle  id="dropdown-basic" className='nav-buttons-button d-flex '>
                        <span>{<Icon icon="gg:profile" color="#fafafa" width="48" height="48" hFlip={true} />}</span>
              </Dropdown.Toggle>

          <Dropdown.Menu  className='profile-dropdowMenu-container'>
            <Dropdown.Item href="#/profile" className='profile-dropdown-links' onClick={() => setProfileModalShow(true)}>
              <span className='px-2' >{<Icon icon="mdi:account" width="24" height="24"/>}</span> Profile 
              <span className=''> {<Icon icon="material-symbols:arrow-forward-ios-rounded" />}</span>
            </Dropdown.Item>
            <Dropdown.Item href="#/theme"  className='profile-dropdown-links' onClick={themebtnShow}>
              <span className='px-2'>{<Icon icon="circum:dark" width="24" height="24" />}Theme</span>
            </Dropdown.Item>
            <Dropdown.Item href="#/sign-out"  className='profile-dropdown-links'  id='sign-out' onClick={CMbtnShow}>
              <span className='px-2'>{<Icon icon="ic:round-log-out" color="#900" width="24" height="24"/>}</span>
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
    </>
);
}
  export default Header;

