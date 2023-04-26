import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import Table from "react-bootstrap/Table";

function ReportModal(props) {
  
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Reports</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="Report-Options mb-2">
          <div className="dropdown">
            <Dropdown variant="light" className="d-inline">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                className=" bg-success p-3"
                // style={{ width: "100px" }}
              >
                {props.selectedSensor}  
                <Icon icon="gridicons:dropdown" width="24" height="24" />

              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item 
                  onClick={() => {
                  props.setSelectedSensor("All");
                  }}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => {
                  props.setSelectedSensor("Temperature");
                  }}
                >
                  Temperature
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("Humidity")}
                >
                  Humidity
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("pH Level")}
                >
                  PH Level
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("Ec Level")}
                >
                  Electrical Conductivity
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="search">
            <form onSubmit={props.searchSubmit}>
              <input
                type="text"
                placeholder="Search"
                className="p-3"
                onChange={props.searchReportFunc}
                value={props.searchReport}
              />
            <Button type="submit" className="mx-1 my-1 btn">
                  <Icon icon="material-symbols:search-rounded" width="24" height="24" />
              </Button>
            </form>
          </div>
        </div>
        <div style={{ height: "400px", overflowY: "scroll" }}>
          <h3></h3>
          <Table bordered hover>
            <thead className="p-2">
              <tr>
                <th style={{ display: "flex", justifyContent: "center" }}>
                  Date
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* reports*/}
              {props.displayReport(props.searchReport)}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReportModal;
