import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import Table from "react-bootstrap/Table";

function ViewLogsModal(props){
    return(
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
                    icon="octicon:log-16"
                    width="24px"
                    height="24px"
                />
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
                    Select Device or Pump
                    {props.selectedSensor}  
                    <Icon icon="gridicons:dropdown" width="24" height="24" />

                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item 
                    onClick={() => {
                    props.setSelectedSensor("Temperature");
                    }}
                    >
                    Grow Light
                    </Dropdown.Item>
                    <Dropdown.Item
                    //   onClick={() => props.setSelectedSensor("Humidity")}
                    >
                    Cooling Fan
                    </Dropdown.Item>
                    <Dropdown.Item
                    onClick={() => props.setSelectedSensor("pH Level")}
                    >
                    Water Pump
                    </Dropdown.Item>
                    <Dropdown.Item
                    onClick={() => props.setSelectedSensor("Ec Level")}
                    >
                    Air pump
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
         
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

    )
}
export default ViewLogsModal;