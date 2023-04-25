import { sendPasswordResetEmail } from "firebase/auth";
import Header from "../components/Header";

import { Icon } from "@iconify/react";
import { Table } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Member(props) {

  const [ManageModalShow, setManageModalShow] = React.useState(false);
  const [AddMemberShow, setAddMemberShow] = React.useState(false);

  return (
    <>

      <ManageModal
        show={ManageModalShow}
        onHide={() => setManageModalShow(false)}
      />
      <AddMember 
        show = {AddMemberShow}
        onHide = {() => setAddMemberShow(false)}
        />

      <Modal
        show={props.show}
        onHide={props.handleCloseBtn}
        size="lg"
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
          <Button className="addMember mb-3" variant="success" onClick={() => setAddMemberShow(true)}>{<Icon icon="mdi:account-multiple-plus" width="24" height="24" className="mx-1"/>} Add member</Button> 

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
                <tr>
                  <td>John Doe</td>
                  <td>johndoe@gmail.com </td>
                  <td className="action-btn">
                      <Button
                        variant="primary"
                        className="modalSaveBtn py-2 m-1 "
                        onClick={() => setManageModalShow(true)}  >
                            Edit
                      </Button>
                    
                    <Button
                      variant="danger"
                      className="deactive-btn py-2 m-1"
                      onClick={""}  >
                          Deactivate
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
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
          <Row className="MngRow p-2">
            <Col md={8} sm={12}>
              <label>Name</label>
              <input type="text" placeholder="Alexis" required="required"/>
              <label>Email</label>
              <input type="email" placeholder="Alexis" required="required" />
              <label>User Level</label>
                <Form.Select aria-label="Default select example">
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
            </Col>
            <Col md={4} sm={12} className="col2">
              <Button variant="success" className="btn  " onClick="">
                {" "} 
                Update{" "}
              </Button>
              <Button variant="primary" className="btn  " onClick="">
                {" "}
                Verify{" "}
              </Button>
              <Button variant="primary" className="btn  " onClick="">
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
              <input type="text" placeholder="Enter Name" required="required"/>
              <label>Email</label>
              <input type="email" placeholder="Enter Email" required="required" />
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
export default Member;
