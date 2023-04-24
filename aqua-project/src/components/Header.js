import "../App.css";
import Logo from "../img/aquaLogo.png";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"
import { useAuth } from "../context/AuthContext";
import { app } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

import Member from "../adminmodal/Member";
import UserLog from "../adminmodal/UserLog";
import { Table } from "react-bootstrap";


function Header() {
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const functions = getFunctions(app, "asia-southeast1");
  const getInfo = httpsCallable(functions, "getProfile");

  useEffect(() => {
    getInfo().then((result) => {
      setUserInfo(result.data);
    });
  }, []);

  const signOut = () => {
    logout();
    CMbtnClose();
    <Navigate to="/login" />;
  };

  /*  HAMBURGER TOGGLE  ------------------------- > */
  const [open, opened] = useState(false);

  const hamburger = () => {
    opened(!open);
  };

  // STYLES EDIT PROFILE INFORMATION
  const disableBG = {
    backgroundColor: "#e8e8e8",
  };
  
  
  /* PROFILE MODAL -------------------------> */

  function ProfileModal(props) {
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
            <span className="px-2">
              {<Icon icon="mdi:account" width="24" height="24" />}
            </span>
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="profile-reverse">
              <Col lg={6} xs={12}>
                <ul className="modal-content-column">
                  <li>
                    <label>Name</label>
                    <input
                      type="input"
                      placeholder="John Doe"
                      value={userInfo.name}
                      disabled
                    />
                  </li>
                  <li>
                    <label>User Level</label>
                    <input
                      type="input"
                      placeholder="Member"
                      value={userInfo.userLevel}
                      disabled
                    />
                  </li>
                  <li>
                    <label>Email Address</label>
                    <input
                      type="input"
                      placeholder="johndoe@gmail.com"
                      value={userInfo.email}
                      disabled
                    />
                  </li>
                </ul>
              </Col>
              <Col lg={6} xs={12} className="modal-links ">
                <ul className="modal-content-column">
                  <li>
                    <a onClick={() => setEditProfileModalShow(true)}>
                      <u>Change Profile Information ? </u>
                    </a>
                    <a onClick={() => setChangePasswordModalShow(true)}>
                      <u>Reset Password </u>
                    </a>
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

  /* EDIT PROFILE MODAL*/
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
            <span className="px-2">
              <Icon
                icon="material-symbols:edit-square-outline-rounded"
                width="24px"
                height="24px"
              />
            </span>{" "}
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="profile-reverse">
              <Col lg={6} xs={12}>
                <ul className="modal-content-column">
                  <li>
                    <label>Name</label>
                    <input
                      type="input"
                      placeholder="John Doe"
                      value={userInfo.name}
                    />
                  </li>
                  <li>
                    <label></label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </li>
                  <li>
                    <label>Email Address</label>
                    <input type="input" placeholder="johndoe@gmail.com" />
                  </li>
                </ul>
              </Col>
              <Col lg={6} xs={12} className="modal-links "></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            className="modalSaveBtn py-3 "
            onClick={props.onHide}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="modalSaveBtn py-3 px-5 "
            onClick={props.onHide}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [EditProfileModalShow, setEditProfileModalShow] = React.useState(false);

  /* CHANGE PASSWORD MODAL */
  function ChangePasswordModal(props) {
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
            <span className="px-2">
              <Icon
                icon="material-symbols:edit-square-outline-rounded"
                width="24px"
                height="24px"
              />
            </span>{" "}
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="profile-reverse">
              <Col lg={6} xs={12}>
                <ul className="modal-content-column">
                  <li>
                    <label>Type Old Password</label>
                    <input type="input" />
                  </li>
                  <li>
                    <label>Type New Password</label>
                    <input type="input" />
                  </li>
                  <li>
                    <label>Re-type New Password</label>
                    <input type="input" />
                  </li>
                  <li>
                    <label></label>
                    <label></label>
                  </li>
                </ul>
              </Col>
              <Col lg={6} xs={12} className="modal-links "></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            className="modalSaveBtn py-3 "
            onClick={props.onHide}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="modalSaveBtn py-3 px-5 "
            onClick={props.onHide}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [ChangePasswordModalShow, setChangePasswordModalShow] = React.useState(false);
    

  // SIGN OUT USESTATE

  const [closeModal, CMsetShow] = useState(false);

  const CMbtnClose = () => CMsetShow(false);
  const CMbtnShow = () => CMsetShow(true);

  // MANAGE MEMBER

  const [show, setShow] = useState(false);
           const handleClose = () => setShow(false);
           const handleShow = () => setShow(true); 


  const [userLog, setUserLog] = useState(false);
           const userLogClose = () => setUserLog(false);
           const userLogShow = () => setUserLog(true); 
           
  // THEME BUTTON USESTATE
  // const [themeBtnCheck, themeBtnIsChecked] = useState(false);

  //     const themeBtn = () => {
  //       themeBtnIsChecked(!themeBtnCheck);
  //     };

  const [themeModal, themeSetShow] = useState(false);

  const themebtnClose = () => themeSetShow(false);
  const themebtnShow = () => themeSetShow(true);

  
const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Set the dark mode state to the value stored in the session storage
    const storedDarkMode = sessionStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    
       // Store the dark mode state in the session storage
        sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);
      
    const handleToggleDarkMode = () => {
      setDarkMode(!darkMode);
    };


  return (
    <> 
      {/* <> *MEMBER MODAL -> ADMIN FILE     
      
          <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
          </Button>
            <Member 
              show={show} 
              handleCloseBtn={()=> setShow(false)}
              >
              </Member>
      </> */}
    

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


 {/**THEME MODAL */}
<>
    <Modal
          show={themeModal}
          onHide={themebtnClose}
          backdrop="static"
          keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Theme</Modal.Title>
        </Modal.Header>
        <Modal.Body className="theme-body">
          <p>Dark Mode :</p>
            <label class="switch">
                {/* <input type="checkbox" checked={darkMode} onClick={() => setDarkMode(!darkMode)} /> */}
                <input type="checkbox" checked={darkMode} onClick={handleToggleDarkMode} />

                <span class="slider round" />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={themebtnClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={themebtnClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  </>
      
  {/*CLOSE MODAL */} 
  <>  
    <Modal
        show={closeModal}
        onHide={CMbtnClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Confirm Sign Out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CMbtnClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={signOut}>
            Sign out
          </Button>
        </Modal.Footer>
      </Modal>
  </>
 
 
    <div className=" nav_bar-container ">
        <div class="ham_logo-container">
          <div class="hamburger-menu" onClick={hamburger}>
            <div class={`hamburger ${open ? "open" : ""}`}>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          </div>
          <div class="nb-logo">
            <img
              src={Logo}
              width="64"
              height="64"
              className="d-inline-block align-top"
              alt="Aqua Logo"
            />
          </div>
        </div>
  
        <ul className="nav-links">
          <li>
            <NavLink to="/" ClassName="active-link">
              Green House
            </NavLink>
          </li>
          <li>
            <NavLink to="/waterlevelpage" ClassName="active-link">
              Water Level
            </NavLink>
          </li>
          <li>
            <NavLink to="/waterconditionpage" ClassName="active-link">
              Water Condition
            </NavLink>
          </li>
          <li>
            <NavLink to="/devicespage" ClassName="active-link">
              Devices & Pumps
            </NavLink>
          </li>
        </ul>

        <Dropdown className="nav-buttons">
          <Dropdown.ItemText className="name px-2">
            <>{userInfo.name ? userInfo.name.toUpperCase() : ""}</>
          </Dropdown.ItemText>
          <Dropdown.Toggle
            id="dropdown-basic"
            variant="success"
            className="nav-buttons-button d-flex" >
            <span>
              {
                <Icon
                  icon="gg:profile"
                  color="#fafafa"
                  width="48"
                  height="48"
                  hFlip={true}  />
              }
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="profile-dropdowMenu-container">
            
            <Dropdown.Item
                className="profile-dropdown-links prof-btn"
                onClick={() => setProfileModalShow(true)} >
                {<Icon icon="mdi:account" width="24" height="24" />}
                Profile
            </Dropdown.Item>
            <Dropdown.Item
                className="profile-dropdown-links"
                onClick={themebtnShow}  >
                {<Icon icon="fluent:dark-theme-20-filled" width="24" height="24" />}
                Theme
            </Dropdown.Item>

            {/*Admin Button ----------------------------*/}

            <Dropdown.Item
              className="profile-dropdown-links"
              onClick={handleShow} >
              <Member 
                  show={show} 
                  handleCloseBtn={() => setShow(false)}>
                </Member>
               
                    <Icon  icon="fluent:people-add-20-filled" width="24" height="24"/>
                     Member

                      
            </Dropdown.Item>

            <Dropdown.Item
                className="profile-dropdown-links"
                onClick={userLogShow} >
              
                <UserLog 
                    show={userLog} 
                    onHideBtn={() => setUserLog(false)} />
                    {<Icon icon="octicon:log-16" width="20" height="20" />}
                    User Log
            </Dropdown.Item>

            <Dropdown.Item
                className="profile-dropdown-links"
                id="sign-out"
                onClick={CMbtnShow} >
                  
                  { <Icon
                      icon="ic:round-log-out"
                      color="#900"
                      width="24"
                      height="24" />  }
                
                      Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      {open && (
        <div class="burger_drop-container">
          <ul class="burger-links">
            <li>
              <NavLink to="/" ClassName="active-link">
                Green House
              </NavLink>
            </li>
            <li>
              <NavLink to="/waterlevelpage" ClassName="active-link">
                Water Level
              </NavLink>
            </li>
            <li>
              <NavLink to="/waterconditionpage" ClassName="active-link">
                Water Condition
              </NavLink>
            </li>
            <li>
              <NavLink to="/devicespage" ClassName="active-link">
                Devices
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default Header;
