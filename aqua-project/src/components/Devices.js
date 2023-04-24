import "../App.css";
import "./Header.js";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import PageItem from 'react-bootstrap/PageItem';

function Devices() {

    const [glowLightCheck, setIsChecked1] = useState(false);
    const [coolingFanCheck, setIsChecked2] = useState(false);
    const [waterCheck, setIsChecked3] = useState(false);
    const [airCheck, setIsChecked4] = useState(false);

    const glowLightBtn = () => {
      setIsChecked1(!glowLightCheck);
    };
    const coolingFanBtn = () => {
        setIsChecked2(!coolingFanCheck);
      };
    const waterPumpBtn = () => {
        setIsChecked3(!waterCheck);
      };
    const airPumpBtn = () => {
        setIsChecked4(!airCheck);
      };

  /**REPORT MODAL*/
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
          <Modal.Title>
              Reports
          </Modal.Title>
        </Modal.Header>
          <Modal.Body >
          <div className="Report-Options mb-3">
            <div className="dropdown">
              <Dropdown variant="light" className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Temperature
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Humidity</Dropdown.Item>
                  <Dropdown.Item href="#">PH Level</Dropdown.Item>
                  <Dropdown.Item href="#">Electrical Conductivity</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='search'>
              {<Icon icon="ic:outline-filter-alt" width="24" height="24"/>}
              <input type="text" placeholder="Search" className="mx-2"/>
              <button type="button" className="bg-success ">Search</button>

            </div>
          </div>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
              <h3></h3>
              <Table bordered hover>
                  <thead className="p-2">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Value Data </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* REPORT MODAL  */}
                    {/* {tempListData.map((data) => (
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.datetime}</td>
                        <td>{data.value} {<Icon icon="tabler:temperature-celsius" width="16" height="16" />}</td>                        
                      </tr>
                    ))} */}
                  </tbody>            
                </Table>
                </div>
          </Modal.Body>
        </Modal>
      );
    }
      
    const [ReportModalShow, setReportModalShow] = React.useState(false);

  return (
<> 
    <div class="db-greenhouse">
        <div class="db-buttons">
       
          <a href="#/reports" onClick={() => setReportModalShow(true)}>
            {<Icon icon="fluent-mdl2:report-document" width="16" height="16" />}{" "}
            View Logs 
          </a>
        </div>
        <div className="display-container">
          <div class="temperature-container">
            <div class="temperature-display">
              <h3>Devices</h3>
              <div className="device-icon" > 
                    {<Icon icon="fa6-solid:lightbulb"  width="72" height="72" />}
                    {<Icon icon="fa6-solid:fan" width="72" height="72" />}
                </div>
                <div className="device-text"> 
                    <p>GLow Light : <span>{glowLightCheck ? ' ON' : ' OFF'} </span></p>
                    <p>Cooling Fan : <span>{coolingFanCheck ? ' ON' : ' OFF'} </span></p>
                </div>
            </div>
            <div class="temperature-data">
            <Table bordered>
                    <thead>
                        <tr>
                            <th className='title-column'>Devices Controls</th>
                            <th className='title-status'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Glow Light</td>
                            <td>    
                            <label class="switch" >
                                <input type="checkbox" checked={ glowLightCheck} onClick={glowLightBtn}/>
                                <span class="slider round"/> 
                            </label>
                            </td>
                        </tr>
                        <tr>
                        <td>Cooling Fan</td>
                            <td>
                            <label class="switch" >
                                <input type="checkbox" checked={coolingFanCheck} onClick={coolingFanBtn}/>
                                <span class="slider round"/> 
                            </label>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </div>
          </div>

          <div class="humidity-container">
            <div class="humidity-display">
              <h3>Pumps</h3>
                <div className="device-icon" > 
                    {<Icon icon="mdi:water-pump"  width="72" height="72" />}
                    {<Icon icon="ic:round-heat-pump" width="72" height="72" />}
                </div>
                <div className="device-text"> 
                    <p>Water Pump : <span>{waterCheck ? ' ON' : ' OFF'} </span></p>
                    <p>Air Pump :  <span>{airCheck ? ' ON' : ' OFF'} </span></p>
                </div>
            </div>
            <div class="humidity-data">
            <Table bordered>
                    <thead>
                        <tr>
                            <th className='title-column'>Pumps</th>
                            <th className='title-status'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Water Pumps</td>
                            <td>    
                            <label class="switch" >
                                <input type="checkbox" checked={waterCheck} onClick={waterPumpBtn}/>
                                <span class="slider round"/>
                            </label>
                            </td>
                        </tr>
                        <tr>
                        <td>Cooling Fan</td>
                            <td>
                            <label class="switch" >
                                <input type="checkbox" checked={airCheck} onClick={airPumpBtn}/>
                                <span class="slider round"/> 
                            </label>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
}
export default Devices;
