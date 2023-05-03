import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import Table from "react-bootstrap/Table";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { isEqual, result } from "lodash";

function ViewLogsModal(props) {
  const functions = getFunctions(app, "asia-southeast1");
  const getSensorLogs = httpsCallable(functions, "getAllUserLogs");
  const [selectedSensor, setSelectedSensor] = useState("Select Device or Pump");
  const [logList, setLogList] = useState([]);
  const [searchLogs, setSearchLogs] = useState();
  let sensor = "";
  if (selectedSensor === "Grow Light") {
    sensor = "Grow";
  } else if (selectedSensor === "Cooling Fan") {
    sensor = "Cooling";
  } else if (selectedSensor === "Water Pump") {
    sensor = "Water";
  } else if (selectedSensor === "Air Pump") {
    sensor = "Air";
  } else {
    sensor = "Grow";
  }
const [object, setObject] = useState({keyword: sensor, date: searchLogs})
  let objec = {
    keyword: sensor,
    date: searchLogs
  };

  useEffect(() => {
    getSensorLogs({keyword: sensor, date:searchLogs }).then((result) => setLogList(result.data));

    
  }, [sensor, searchLogs]);



  const searchFunc = (event) => {
    setSearchLogs(event.target.value);
  };
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
            <Icon icon="octicon:log-16" width="24px" height="24px" />
          </span>{" "}
          View Logs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="Report-Options mb-3">
          <Dropdown variant="light" className="d-inline">
            <Dropdown.Toggle
              id="dropdown-autoclose-true"
              className=" bg-success p-3"
              // style={{ width: "100px" }}
            >
              {selectedSensor}
              <Icon icon="gridicons:dropdown" width="24" height="24" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSelectedSensor("Grow Light");
                }}
              >
                Grow Light
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedSensor("Cooling Fan")}>
                Cooling Fan
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedSensor("Water Pump")}>
                Water Pump
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedSensor("Air Pump")}>
                Air pump
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="search">
            <form onSubmit={props.searchSubmit}>
              <input
                type="text"
                placeholder="Seach Date"
                className="p-3"
                onChange={searchFunc}
                // value={searchLogs}
              />
              <Button type="submit" className="mx-1 my-1 btn">
                <Icon
                  icon="material-symbols:search-rounded"
                  width="24"
                  height="24"
                />
              </Button>
            </form>
          </div>
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
  );
}
export default ViewLogsModal;
