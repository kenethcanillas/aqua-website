import "../App.css";
import Logo from "../img/aquaLogo.png";

import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Navigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/AuthContext";
import { app } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";
import { Stack, capitalize } from "@mui/material";
import useRunOnce from "../utility/useRunOnce";

// import Member from "../adminmodal/Member";
// import UserLog from "../adminmodal/UserLog";
import { Table } from "react-bootstrap";
import lodash, { result } from "lodash";


function Header() {
  const { logout, verifyEmail, resetPassword } = useAuth();

  const [userInfo, setUserInfo] = useState({});
  const functions = getFunctions(app, "asia-southeast1");
  const getInfo = httpsCallable(functions, "getProfile");
  const updateInfo = httpsCallable(functions, "updateUserInfo");
  const updateUsers = httpsCallable(functions, "updateUser");
  const getMemberList = httpsCallable(functions, "listUsers");

  const [memberList, setMemberList] = useState([]);
  const [editUser, setEditUser] = useState({});
  const name = useRef();
  const email = useRef();

  useEffect(() => {
    getInfo().then((result) => {
      setUserInfo(result.data);
    });
  }, []);
  useEffect(() => {
    getMemberList().then((result) => {
      setMemberList(result.data.users);
    });
  }, []);
  const signOut = () => {
    logout();
    CMbtnClose();
    <Navigate to="/" />;
  };

  const updateProfile = (e) => {
    e.preventDefault();
    let info = {
      ...(email.current.value != userInfo.email &&
        (email.current.value != "" || email.current.value != null) && {
          email: email.current.value,
        }),
      ...(name.current.value != userInfo.name &&
        (name.current.value != "" || name.current.value != null) && {
          name: name.current.value,
        }),
    };

    if (!lodash.isEmpty(info)) {
      updateInfo(info).then((result) => {
        getInfo().then((data) => {
          setUserInfo(data.data);
        });
        setEditProfileModalShow(false);
      });
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const closeModalProfile = () => {
    setProfileModalShow(false);
    setEditProfileModalShow(true);
  };
  const verifyBtn = () => {
    verifyEmail().then(() => {
      setProfileModalShow(false);
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Email Sent",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  const checkVerification = (isVerify) => {
    if (!isVerify) {
      return (
        <div
          className="bg-warning"
          height={50}
          style={{
            display: "flex",
            borderRadius: "5px",
            justifyContent: "space-around",
            alignItems: "center",
            justifyItems: "center",
            padding: "5px",
          }}
        >
          <div>Your Account is Not yet Verified</div>
          <a style={{ cursor: "pointer" }} onClick={verifyBtn}>
            <u>Verify Now</u>
          </a>
        </div>
      );
    } else {
      return;
    }
  };
  const resetPasswordBtn = () => {
    setProfileModalShow(false);
    resetPassword(userInfo.email).then(() => {
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Password Reset Sent to Email",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  /*  HAMBURGER TOGGLE */
  const [open, opened] = useState(false);

  const hamburger = () => {
    opened(!open);
  };

  // STYLES EDIT PROFILE INFORMATION
  const disableBG = {
    backgroundColor: "#e8e8e8",
  };

  const updateUser = (e) => {
    e.preventDefault();
    // console.log(e.target.form[0].value);

    let data = {
      id: editUser.id,
      name: "",
      email: "",
      userLevel: "",
    };
    if (
      e.target.form[0].value != null &&
      e.target.form[0].value != userInfo.name
    ) {
      data.name = e.target.form[0].value;
    } else {
      data.name = userInfo.name;
    }

    if (
      e.target.form[1].value != null &&
      e.target.form[1].value != userInfo.email
    ) {
      data.email = e.target.form[1].value;
    } else {
      data.email = userInfo.email;
    }

    if (
      e.target.form[2].value != null &&
      e.target.form[2].value != userInfo.userLevel
    ) {
      data.userLevel = e.target.form[2].value;
    } else {
      data.userLevel = userInfo.userLevel;
    }

    updateUsers(data).then(() => {
      setManageModalShow(false)
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Success",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  /* PROFILE MODAL -------------------------> */

  function ProfileModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="px-2">
              {<Icon icon="mdi:account" width="26" height="26" />}
            </span>
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="profile-reverse">
              <Col lg={12} xs={12}>
                <ul className="modal-content-column profile">
                  {checkVerification(userInfo.isEmailVerified)}

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
              <Col lg={12} xs={12} className="modal-links p-4 ">
                <Button
                  variant="primary"
                  className="p-3 mb-3"
                  onClick={closeModalProfile}
                >
                  {" "}
                  Edit Profile{" "}
                </Button>
                <Button
                  variant="danger"
                  className="p-3"
                  onClick={resetPasswordBtn}
                >
                  {" "}
                  Reset Password{" "}
                </Button>
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
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form>
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
                <Col lg={12} xs={12}>
                  <ul className="modal-content-column">
                    <li>
                      <form>
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          ref={name}
                          defaultValue={userInfo.name}
                        />
                      </form>
                    </li>
                    <li>
                      <Form.Select
                        aria-label="Default select example"
                        className="mt-4 py-3"
                        disabled
                      >
                        <option defaultValue={userInfo.userLevel}>
                          {userInfo.userLevel}
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                      </Form.Select>
                    </li>
                    <li>
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        ref={email}
                        defaultValue={userInfo.email}
                      />
                    </li>
                  </ul>
                </Col>
                <Col lg={12} xs={12} className="modal-links px-4">
                  <Button
                    variant="success"
                    className="modalSaveBtn p-3 mb-3 "
                    onClick={updateProfile}
                  >
                    Save
                  </Button>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="modalSaveBtn py-3 "
                    onClick={props.onHide}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Form>
      </Modal>
    );
  }

  const [EditProfileModalShow, setEditProfileModalShow] = React.useState(false);



  // SIGN OUT USESTATE

  const [closeModal, CMsetShow] = useState(false);

  const CMbtnClose = () => CMsetShow(false);
  const CMbtnShow = () => CMsetShow(true);

  // MANAGE MEMBER

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
    const storedDarkMode = sessionStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Store the dark mode state in the session storage
    sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // MEMBER MODAL
  const [memberModal, setMemberShow] = useState(false);
  const memberShow = () => setMemberShow(true);
  const memberClose = () => setMemberShow(false);

  // USER LOG
  const [userLogModal, setUserLog] = useState(false);
  const userLogClose = () => setUserLog(false);
  const userLogShow = () => setUserLog(true);

  const [ManageModalShow, setManageModalShow] = React.useState(false);
  const [AddMemberShow, setAddMemberShow] = React.useState(false);

  const closeMemberModal = (id, name, email, userLevel) => {
    setMemberShow(false);
    setManageModalShow(true);
    setEditUser({ id: id, name: name, email: email, userLevel: userLevel });
  };
  const closeAddMemberModal = () => {
    setMemberShow(false);
    setAddMemberShow(true);
    // setEditUser({ id: id, name: name, email: email, userLevel: userLevel });
  };

  // console.log(editUser);

  // IF ADMIN OR USER
  const showAdminAction = (userLevel) => {
    if (userLevel === "admin") {
      return (
        <>
          {" "}
          <Dropdown.Item
            className="profile-dropdown-links"
            onClick={memberShow}
          >
            <span className="px-2">
              {
                <Icon
                  icon="fluent:people-add-20-filled"
                  width="24"
                  height="24"
                />
              }
              Member
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            className="profile-dropdown-links"
            onClick={userLogShow}
          >
            {/* <UserLog
              show={userLog}
              onHideBtn={() => setUserLog(false)}
            ></UserLog> */}

            <span className="px-2">
              {<Icon icon="octicon:log-16" width="24" height="24" />} User Log
            </span>
          </Dropdown.Item>
        </>
      );
    }
  };

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

      <ManageModal
        show={ManageModalShow}
        onHide={() => setManageModalShow(false)}
        editUser={editUser}
        updateUser={updateUser}
      />
      <AddMember 
        show={AddMemberShow} 
        onHide={() => setAddMemberShow(false)} 
        
        />

      <>
        <Modal
          show={memberModal}
          onHide={memberClose}
          size="lg"
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          // deactivateBtn={deactivateBtn}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span className="pr-2">
                {
                  <Icon
                    icon="fluent:people-add-20-filled"
                    width="26"
                    height="26"
                  />
                }
              </span>{" "}
              Member List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              className="addMember mb-3"
              variant="success"
              onClick={() => closeAddMemberModal(false)}
            >
              {
                <Icon
                  icon="mdi:account-multiple-plus"
                  width="24"
                  height="24"
                  className="mx-1"
                />
              }
              Add member
            </Button>

            <div style={{ height: "400px", overflowY: "scroll" }}>
              <Table bordered hover>
                <thead className="p-2">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList.map((data) => (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td className="action-btn">
                        <Button
                          variant="primary"
                          className="modalSaveBtn py-2 m-1 "
                          onClick={() =>
                            closeMemberModal(
                              data.id,
                              data.name,
                              data.email,
                              data.userLevel
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          className="deactive-btn py-2 m-1"
                          // onClick={deactivateBtn}
                        >
                          Deactivate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>
      </>

      {/* USER LOG*/}
      <>
        <Modal
          show={userLogModal}
          onHide={userLogClose}
          size="lg"
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <span className="px-2">
                <Icon icon="octicon:log-16" width="24px" height="24px" />
              </span>{" "}
              User Log
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="search-con">
              <input type="text" placeholder="Search" />
              <Button type="submit" className="btn">
                <Icon
                  icon="material-symbols:search-rounded"
                  width="24"
                  height="24"
                />
              </Button>
            </div>

            <div
              className="userlog-div"
              style={{ height: "400px", overflowY: "scroll" }}
            >
              <Table bordered hover className="userlog-tbl">
                <thead className="p-2">
                  <tr>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>
      </>

      {/**THEME MODAL */}
      <>
        <Modal
          show={themeModal}
          onHide={themebtnClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <Icon
                icon="fluent:dark-theme-20-filled"
                width="26px"
                height="26px"
              />{" "}
              Theme
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="theme-body">
            <p>{darkMode ? "Dark mode" : "Light Mode"}</p>
            <label class="switch">
              {/* <input type="checkbox" checked={darkMode} onClick={() => setDarkMode(!darkMode)} /> */}
              <input
                type="checkbox"
                checked={darkMode}
                onClick={handleToggleDarkMode}
              />

              <span class="slider round" />
            </label>
          </Modal.Body>
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
            <Modal.Title>Sign Out</Modal.Title>
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
              Hydro Farm
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
          <li>
            <NavLink to="/plants" ClassName="active-link">
              Plant Slots
            </NavLink>
          </li>
        </ul>
        <div className="d-flex">
          <Dropdown className="notif mx-2">
          <Dropdown.Toggle
              id="dropdown-basic"
              variant="light"
              className="notif-btn"
            >
              {<Icon icon="clarity:notification-solid" width="30" height="30" style={{position:"relative"}}/>}
              <div className="notif-color"/>    
          </Dropdown.Toggle> 
            
            <Dropdown.Menu className="notif-container scrollable-menu" style={{ maxHeight: '400px'}}>
                <div className="notif-title p-4">
                  <h5>Notification </h5>
                  <a style={{color:"blue",cursor:"pointer"}}> Mark All as read </a>
                </div>
                    <Dropdown.Item className="notif-item px-4 py-2">
                      <div className="notif-header d-flex">
                        <p style={{fontWeight:'600'}}>Switch Notice</p>       
                        <p className="time">2 mins ago...</p>
                      </div>
                        <p >Turn ON the Cooling Fan Switch</p>
                    </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>                
          <Dropdown className="nav-buttons">
            <Dropdown.ItemText className="name px-2">
              <>{userInfo.name ? userInfo.name.toUpperCase() : ""}</>
            </Dropdown.ItemText>
            <Dropdown.Toggle
              id="dropdown-basic"
              variant="success"
              className="nav-buttons-button d-flex"
            >
              <span>
                {
                  <Icon
                    icon="gg:profile"
                    color="#fafafa"
                    width="48"
                    height="48"
                    hFlip={true}
                  />
                }
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="profile-dropdowMenu-container">
              <Dropdown.Item
                className="profile-dropdown-links prof-btn"
                onClick={() => setProfileModalShow(true)}
              >
                {<Icon icon="mdi:account" width="24" height="24" />}
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="profile-dropdown-links"
                onClick={themebtnShow}
              >
                <span className="px-2">
                  {
                    <Icon
                      icon="fluent:dark-theme-20-filled"
                      width="24"
                      height="24"
                    />
                  }
                  Theme
                </span>
              </Dropdown.Item>

              {/*Admin Button ----------------------------*/}
              {/* {showAdminAction(userInfo.userLevel) */}
              {showAdminAction(userInfo.userLevel)}
              <Dropdown.Item
                className="profile-dropdown-links"
                id="sign-out"
                onClick={CMbtnShow}
              >
                <span className="px-2">
                  {
                    <Icon
                      icon="ic:round-log-out"
                      color="#900"
                      width="24"
                      height="24"
                    />
                  }
                </span>
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
      </div>

      {open && (
        <div class="burger_drop-container">
          <ul class="burger-links">
            <li>
              <NavLink to="/" ClassName="active-link">
                Hydro Farm
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
            <li>
              <NavLink to="/plants" ClassName="active-link">
                Plant Spots
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

function ManageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {console.log(props.editUser)} */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="px-2">
            <Icon
              icon="material-symbols:edit-square-outline-rounded"
              width="24px"
              height="24px"
            />
          </span>{" "}
          Manage User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form>
            <Row className="MngRow p-2">
              <Col md={8} sm={12}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Alexis"
                  required="required"
                  defaultValue={props.editUser.name}
                />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Alexis"
                  required="required"
                  defaultValue={props.editUser.email}
                />
                <label>User Level</label>
                <Form.Select aria-label="Default select example">
                  <option value={props.editUser.userLevel}>
                    {props.editUser.userLevel != null
                      ? capitalize(props.editUser.userLevel)
                      : ""}
                  </option>
                  <option value="admin">User</option>
                  <option value="member">Admin</option>
                </Form.Select>
              </Col>
              <Col md={4} sm={12} className="col2">
                <Button
                  type="button"
                  variant="success"
                  className="btn  "
                  onClick={props.updateUser}
                >
                  {" "}
                  Update{" "}
                </Button>
                <Button variant="primary" className="btn  " onClick="">
                  {" "}
                  Reset Password{" "}
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function AddMember(props) {
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
          Add Member
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="MngRow p-2">
            <Col md={8} sm={12}>
              <label>Name</label>
              <input type="text" placeholder="Enter Name" required="required" />
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                required="required"
              />
              <label>User Level</label>
              <Form.Select aria-label="Default select example">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Col>
            <Col md={4} sm={12} className="col2">
              <Button variant="success" className="btn  " onClick="">
                {" "}
                Add Member{" "}
              </Button>
              <Button variant="light" className="btn  " onClick={props.onHide}>
                {" "}
                Cancel{" "}
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Header;
