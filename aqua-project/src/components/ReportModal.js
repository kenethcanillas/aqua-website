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
        <div className="Report-Options mb-3">
          <div className="dropdown">
            <Dropdown variant="light" className="d-inline mx-2">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                style={{ width: "100px" }}
              >
                {props.selectedSensor}
              </Dropdown.Toggle>
              <Dropdown.Menu>
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
            {<Icon icon="ic:outline-filter-alt" width="24" height="24" />}
            <form onSubmit={props.searchSubmit}>
              <input
                type="text"
                placeholder="Search"
                className="mx-2"
                onChange={props.searchReportFunc}
                value={props.searchReport}
              />
              <button type="submit" className="bg-success ">
                Search
              </button>
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
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
