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

  return (
    <>
      <ManageModal
        show={ManageModalShow}
        onHide={() => setManageModalShow(false)}
      />
      <Modal
        show={props.show}
        onHide={props.handleCloseBtn}
        size="lg"
        backdrop="static"
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
            Member List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "400px", overflowY: "scroll" }}>
            <h3></h3>
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
                  <td>
                    <Button
                      variant="primary"
                      className="modalSaveBtn py-2 "
                      onClick={() => setManageModalShow(true)}
                    >
                      Manage
                    </Button>
                    {/* <Button onClick={props.handleCloseBtn}>
                                closeButton
                            </Button> */}
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
              <input type="text" placeholder="Alexis" />
              <label>Email</label>
              <input type="text" placeholder="Alexis" />
              <label></label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Select>
            </Col>
            <Col md={4} sm={12} className="col2">
              <Button variant="primary" className="btn  " onClick="">
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
              <Button variant="danger" className="btn " onClick="">
                {" "}
                Deactiveate{" "}
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default Member;
