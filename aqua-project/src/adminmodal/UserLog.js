// import Header from "../components/Header";

import { Icon } from "@iconify/react";
import { Table } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";
import { capitalize } from "lodash";

function UserLog(props) {
  const functions = getFunctions(app, "asia-southeast1");
  const getSensorLogs = httpsCallable(functions, "getAllUserLogs");

  const [logList, setLogList] = useState([]);
  const [searchLogs, setSearchLogs] = useState("");

  useEffect(() => {
    getSensorLogs().then((result) => setLogList(result.data));
  }, []);

  useEffect(() => {
    getSensorLogs({ keyword: searchLogs }).then((result) =>
      setLogList(result.data)
    );
  }, [searchLogs]);

  const searchFunc = (event) => {
    setSearchLogs(capitalize(event.target.value));
  };
console.log(props)
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} size="lg" centered>
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
            <input
              type="text"
              placeholder="Search Log Activity"
              onChange={searchFunc}
            />
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
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {logList.map((data) => (
                  <tr>
                    <td>{data.email}</td>
                    <td>{data.datetime}</td>
                    <td>{data.activity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UserLog;
