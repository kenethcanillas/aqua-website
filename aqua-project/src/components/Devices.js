import "../App.css";
import "./Header.js";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";

import ViewLogsModal from "./ViewLogsModal";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function Devices() {
  const { currentUser } = useAuth();
  const functions = getFunctions(app, "asia-southeast1");
  const scheduler = httpsCallable(functions, "scheduler");
  const g = query(collection(db, "scheduler"));
  const [glowLightCheck, setIsChecked1] = useState();
  const [coolingFanCheck, setIsChecked2] = useState();
  const [waterCheck, setIsChecked3] = useState(false);
  const [airCheck, setIsChecked4] = useState(false);
  const [glowLoad, setGlowLoad] = useState(false);
  const glowLightBtn = (event) => {
    event.preventDefault();
    setGlowLoad(true);
    if (glowLightCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "grow_light",
        data: data,
      };
      scheduler(objec).then(() => {
        setTimeout(() => {
          setGlowLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Glow Light is OFF",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
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
        setTimeout(() => {
          setGlowLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Glow Light is ON",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
      });
    }
  };
  //   colling fan on cloick
  const [coolLoad, setCoolLoad] = useState(false);
  const coolingFanBtn = (event) => {
    event.preventDefault();
    setCoolLoad(true);
    if (coolingFanCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "cooling_fan",
        data: data,
      };
      scheduler(objec).then(() => {
        setTimeout(() => {
          setCoolLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Cooling Fan is OFF",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
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
        setTimeout(() => {
          setCoolLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Cooling Fan is ON",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
      });
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "scheduler", "grow_light"), (data) => {
      setIsChecked1(data.data().switch);
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
  }, []);

  const [waterLoad, setWaterLoad] = useState(false);
  const waterPumpBtn = (event) => {
    event.preventDefault();
    setWaterLoad(true);
    if (waterCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "water_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        setTimeout(() => {
          setWaterLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Water Pump is OFF",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
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
        setTimeout(() => {
          setWaterLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Water Pump is ON",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
      });
    }
  };
  const [airLoad, setAirLoad] = useState(false);
  const airPumpBtn = (event) => {
    event.preventDefault();
    setAirLoad(true);
    if (airCheck) {
      const data = {
        switch: false,
      };
      const objec = {
        docName: "air_pump",
        data: data,
      };
      scheduler(objec).then(() => {
        setTimeout(() => {
          setAirLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Water Pump is OFF",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
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
        setTimeout(() => {
          setAirLoad(false);
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Air Pump is ON",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 10000);
      });
    }
  };

  const [ViewLogShow, setViewLogShow] = React.useState(false);
  const [userLevel, setUserLevel] = useState();
  const [deviceStatus, setDeviceStatus] = useState();

  const docRef = doc(db, "users", currentUser.uid);
  const docSnap = getDoc(docRef);
  const updateSensorStatus = doc(db, "scheduler", "userLevel");

  useEffect(() => {
    docSnap.then((data) => {
      setUserLevel(data.data().userLevel);
    });

    onSnapshot(doc(db, "scheduler", "userLevel"), (doc) => {
      setDeviceStatus(doc.data());
    });
  }, []);
  const updateSensorRef = doc(db, "scheduler", "userLevel");
  useEffect(() => {}, []);

  const allowUserBtn = async (event, sensor, status) => {
    event.preventDefault();
    switch (sensor) {
      case "grow_light":
        await updateDoc(updateSensorRef, {
          grow_light: !status,
        });
        break;
      case "cooling_fan":
        await updateDoc(updateSensorRef, {
          cooling_fan: !status,
        });
        break;

      case "air_pump":
        await updateDoc(updateSensorRef, {
          air_pump: !status,
        });
        break;
      case "water_pump":
        await updateDoc(updateSensorRef, {
          water_pump: !status,
        });
        break;
    }
  };

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
                    <th className="title-column">Devices Controls</th>
                    <th className="title-status" colSpan="2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Glow Light</td>
                    <td colSpan="2" className="devices-control">
                      {glowLoad ? (
                        <CircularProgress style={{ color: "#1C7A6A" }} />
                      ) : (
                        <label class="switch">
                          <input
                            type="checkbox"
                            disabled={
                              userLevel == "member"
                                ? !deviceStatus.grow_light
                                : false
                            }
                            checked={glowLightCheck}
                            onClick={glowLightBtn}
                          />
                          <span
                            class="slider round"
                            style={{
                              cursor:
                                userLevel == "member"
                                  ? !deviceStatus.grow_light
                                    ? "not-allowed"
                                    : "pointer"
                                  : "pointer",
                            }}
                          />
                        </label>
                      )}

                      {userLevel == "admin" ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={(event) =>
                            allowUserBtn(
                              event,
                              "grow_light",
                              deviceStatus.grow_light
                            )
                          }
                        >
                          Allow User:{" "}
                          {deviceStatus.grow_light ? (
                            <Icon
                              icon="mdi:user-check"
                              width="32"
                              height="32"
                            />
                          ) : (
                            <Icon
                              icon="mdi:user-block"
                              width="32"
                              height="32"
                            />
                          )}
                        </span>
                      ) : (
                        ""
                      )}

                      {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                          Camera
                          </a> */}
                    </td>
                  </tr>
                  <tr>
                    <td>Cooling Fan</td>
                    <td className="devices-control" colSpan="1">
                      {coolLoad ? (
                        <CircularProgress style={{ color: "#1C7A6A" }} />
                      ) : (
                        <label class="switch">
                          <input
                            type="checkbox"
                            disabled={
                              userLevel == "member"
                                ? !deviceStatus.cooling_fan
                                : false
                            }
                            checked={coolingFanCheck}
                            onClick={coolingFanBtn}
                          />
                          <span
                            class="slider round"
                            style={{
                              cursor:
                                userLevel == "member"
                                  ? !deviceStatus.cooling_fan
                                    ? "not-allowed"
                                    : "pointer"
                                  : "pointer",
                            }}
                          />
                        </label>
                      )}

                      {userLevel == "admin" ? (
                        <span
                          onClick={(event) =>
                            allowUserBtn(
                              event,
                              "cooling_fan",
                              deviceStatus.cooling_fan
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          Allow User:{" "}
                          {deviceStatus.cooling_fan ? (
                            <Icon
                              icon="mdi:user-check"
                              width="32"
                              height="32"
                            />
                          ) : (
                            <Icon
                              icon="mdi:user-block"
                              width="32"
                              height="32"
                            />
                          )}
                        </span>
                      ) : (
                        ""
                      )}

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
                      {waterLoad ? (
                        <CircularProgress style={{ color: "#1C7A6A" }} />
                      ) : (
                        <label class="switch">
                          <input
                            type="checkbox"
                            disabled={
                              userLevel == "member"
                                ? !deviceStatus.water_pump
                                : false
                            }
                            checked={waterCheck}
                            onClick={waterPumpBtn}
                          />
                          <span
                            class="slider round"
                            style={{
                              cursor:
                                userLevel == "member"
                                  ? !deviceStatus.water_pump
                                    ? "not-allowed"
                                    : "pointer"
                                  : "pointer",
                            }}
                          />
                        </label>
                      )}

                      {userLevel == "admin" ? (
                        <span
                          onClick={(event) =>
                            allowUserBtn(
                              event,
                              "water_pump",
                              deviceStatus.water_pump
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          Allow User:{" "}
                          {deviceStatus.water_pump ? (
                            <Icon
                              icon="mdi:user-check"
                              width="32"
                              height="32"
                            />
                          ) : (
                            <Icon
                              icon="mdi:user-block"
                              width="32"
                              height="32"
                            />
                          )}
                        </span>
                      ) : (
                        ""
                      )}

                      {/* <a style={{cursor:"pointer"}}>
                          <Icon icon="material-symbols:video-camera-back-rounded" className="mx-2" width="24px" height="24px" /> 
                          Camera
                      </a> */}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">Air Pump</td>
                    <td className="devices-control">
                      {airLoad ? (
                        <CircularProgress style={{ color: "#1C7A6A" }} />
                      ) : (
                        <label class="switch">
                          <input
                            type="checkbox"
                            disabled={
                              userLevel == "member"
                                ? !deviceStatus.air_pump
                                : false
                            }
                            checked={airCheck}
                            onClick={airPumpBtn}
                          />
                          <span
                            class="slider round"
                            style={{
                              cursor:
                                userLevel == "member"
                                  ? !deviceStatus.air_pump
                                    ? "not-allowed"
                                    : "pointer"
                                  : "pointer",
                            }}
                          />
                        </label>
                      )}

                      {userLevel == "admin" ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={(event) =>
                            allowUserBtn(
                              event,
                              "air_pump",
                              deviceStatus.water_pump
                            )
                          }
                        >
                          Allow User:{" "}
                          {deviceStatus.air_pump ? (
                            <Icon
                              icon="mdi:user-check"
                              width="32"
                              height="32"
                            />
                          ) : (
                            <Icon
                              icon="mdi:user-block"
                              width="32"
                              height="32"
                            />
                          )}
                        </span>
                      ) : (
                        ""
                      )}

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
