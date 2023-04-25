import Header from "../components/Header";

import { Icon } from "@iconify/react";
import { Table } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

function UserLog(props){
    return(
    <>
        <Modal
            show={props.show}
            onHide={props.onHideBtn}
            size="lg"
            centered
       
    >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        <span className="px-2">
          <Icon
            icon="octicon:log-16"
            width="24px"
            height="24px"
          />
        </span>{" "}
       User Log
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className="search-con">
                    <input type="text" placeholder="Search"  /> 
                    <Button type="submit" className="btn">
                        <Icon icon="material-symbols:search-rounded" width="24" height="24" />
                    </Button>
                </div>

    <div className='userlog-div' style={{ height: '400px', overflowY: 'scroll' }}>   
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
    )    
}export default UserLog;