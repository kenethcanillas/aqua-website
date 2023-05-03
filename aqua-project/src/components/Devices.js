import "../App.css";
import "./Header.js";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { app, db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";

import ViewLogsModal from "./ViewLogsModal";
import { Button } from "react-bootstrap";

function Devices() {
  const functions = getFunctions(app, "asia-southeast1");
  const scheduler = httpsCallable(functions, "scheduler");
  const g = query(collection(db, "scheduler"));
  const [glowLightCheck, setIsChecked1] = useState();
  const [coolingFanCheck, setIsChecked2] = useState();
  const [waterCheck, setIsChecked3] = useState(false);
  const [airCheck, setIsChecked4] = useState(false);

  const glowLightBtn = (event) => {
    event.preventDefault();

    if (glowLightCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "grow_light",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Glow Light is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      const data = {
        switch: true,
      };
      const objec = {
        docName: "grow_light",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Glow Light is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };
  //   colling fan on cloick
  const coolingFanBtn = (event) => {
    event.preventDefault();
    if (coolingFanCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "cooling_fan",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Cooling Fan is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      const data = {
        switch: true,
      };
      const objec = {
        docName: "cooling_fan",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Cooling Fan is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };
  
  useEffect(() => {
    onSnapshot(doc(db, "scheduler", "grow_light"), (data) => {
      setIsChecked1(data.data().switch);
      let text = data.data().switch ? "ON" : "OFF";
    });
    onSnapshot(doc(db, "scheduler", "cooling_fan"), (data) => {
      setIsChecked2(data.data().switch);
    });
    onSnapshot(doc(db, "scheduler", "water_pump"), (data) => {
      setIsChecked3(data.data().switch);
    });
    onSnapshot(doc(db, "scheduler", "air_pump"), (data) => {
      setIsChecked4(data.data().switch);
    });
  });

  const waterPumpBtn = (event) => {
    event.preventDefault();
    if (waterCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "water_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Water Pump is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      const data = {
        switch: true,
      };
      const objec = {
        docName: "water_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Water Pump is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };
  const airPumpBtn = (event) => {
    event.preventDefault();
    if (airCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "air_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Water Pump is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      const data = {
        switch: true,
      };
      const objec = {
        docName: "air_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Air Pump is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  const [ViewLogShow, setViewLogShow] = React.useState(false);

  return (
    <>
      <ViewLogsModal show={ViewLogShow} onHide={() => setViewLogShow(false)} />

      <div class="db-greenhouse">
        <div class="db-buttons">
          <a onClick={() => setViewLogShow(true)} style={{ cursor: "pointer" }}>
            {<Icon icon="fluent-mdl2:report-document" width="16" height="16" />}{" "}
            View Logs
          </a>
        </div>
        <div className="display-container">
          <div class="temperature-container">
            <div class="devices-display">
              <h3>Devices</h3>
              <div className="device-icon">
                {
                  <Icon
                    icon="fa6-solid:lightbulb"
                    width="72"
                    height="72"
                    style={{ color: glowLightCheck ? "white" : "black" }}
                  />
                }
                {
                  <Icon
                    icon="fa6-solid:fan"
                    width="72"
                    height="72"
                    style={{
                      animation: coolingFanCheck
                        ? "rotation 2s infinite linear"
                        : "none",
                      color: coolingFanCheck ? "white" : "black",
                    }}
                  />
                }
              </div>
              <div className="device-text">
                <p>
                  Glow Light : <span>{glowLightCheck ? " ON" : " OFF"} </span>
                </p>
                <p>
                  Cooling Fan : <span>{coolingFanCheck ? " ON" : " OFF"} </span>
                </p>
              </div>
            </div>
            <div class="temperature-data">
              <Table bordered>
                <thead>
                  <tr>
                    <th className="title-column" colSpan="2">
                      Devices Controls
                    </th>
                    <th className="title-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">Glow Light</td>
                    <td className="devices-control">
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={glowLightCheck}
                          onClick={glowLightBtn}
                        />
                        <span class="slider round" />
                      </label>
                        {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                          Camera
                          </a> */}
                      </td>
                  </tr>
                  <tr>
                    <td colSpan="2">Cooling Fan</td>
                    <td className="devices-control">
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={coolingFanCheck}
                          onClick={coolingFanBtn}
                        />
                        <span class="slider round" />
                      </label>
                      {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                          Camera
                      </a>                     */}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div class="humidity-container">
            <div class="pump-display">
              <h3>Pumps</h3>
              <div className="device-icon">
                {
                  <Icon
                    icon="mdi:water-pump"
                    width="72"
                    height="72"
                    style={{ color: waterCheck ? "white" : "black" }}
                  />
                }
                {
                  <Icon
                    icon="mdi:pump"
                    width="72"
                    height="72"
                    style={{ color: airCheck ? "white" : "black" }}
                  />
                }
              </div>
              <div className="device-text">
                <p>
                  Water Pump : <span>{waterCheck ? " ON" : " OFF"} </span>
                </p>
                <p>
                  Air Pump : <span>{airCheck ? " ON" : " OFF"} </span>
                </p>
              </div>
            </div>
            <div class="humidity-data">
              <Table bordered>
                <thead>
                  <tr>
                    <th className="title-column" colSpan="2">
                      Pumps
                    </th>
                    <th className="title-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">Water Pumps</td>
                    <td className="devices-control">
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={waterCheck}
                          onClick={waterPumpBtn}
                        />
                        <span class="slider round" />
                      </label>
                      {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                          Camera
                      </a> */}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">Air Pump</td>
                    <td className="devices-control">
                      <label class="switch">
                        <input
                          type="checkbox"
                          checked={airCheck}
                          onClick={airPumpBtn}
                        />
                        <span class="slider round" />
                      </label>
                      {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                           Camera
                      </a> */}
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
