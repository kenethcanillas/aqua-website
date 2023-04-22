import "../App.css";
import "./Header.js";

import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { app, db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";

function Devices() {
  const functions = getFunctions(app, "asia-southeast1");
  const scheduler = httpsCallable(functions, "scheduler");
  const g = query(collection(db, "scheduler"));
  const [glowLightCheck, setIsChecked1] = useState();
  const [coolingFanCheck, setIsChecked2] = useState();

  const glowLightBtn = (event) => {
    event.preventDefault();
    
    if (glowLightCheck) {
        const data = {
            switch : false
        }
        const objec = {
            docName: "grow_light",
            data: data
        }
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Grow Light is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }else{
        const data = {
            switch : true
        }
        const objec = {
            docName: "grow_light",
            data: data
        }
        scheduler(objec).then(() => {
            return Swal.fire({
              position: "center",
              icon: "success",
              title: "Grow Light is ON",
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
            switch : false
        }
        const objec = {
            docName: "cooling_fan",
            data: data
        }
      scheduler(objec).then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Cooling Fan is OFF",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }else{
        const data = {
            switch : true
        }
        const objec = {
            docName: "cooling_fan",
            data: data
        }
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
    });
    onSnapshot(doc(db, "scheduler", "cooling_fan"), (data) => {
      setIsChecked2(data.data().switch);
    });
  });

  return (
    <>
      <div class="container pt-4">
        <div className="row-container">
          <div class="column-1">
            <div class="column-content p-xs-2">
              <h3 className="content-title">Grow Light</h3>
              <h2 className="content-value">
                {<Icon icon="fa6-solid:lightbulb" style={{color: (glowLightCheck)? "yellow": "black"}} width="72" height="72" />}
              </h2>
              <p className="content-condition">
                Status: {glowLightCheck ? "ON" : "OFF"}
              </p>
            </div>
          </div>
          <div class="column-2">
            <div class="column-content p-xs-2">
              <h3 className="content-title">Cooling Fan</h3>
              <h2 className="content-value">
                {<Icon icon="fa6-solid:fan" width="72" height="72"  style={{animation: (coolingFanCheck)? "rotation 2s infinite linear":"none"}}/>}
              </h2>
              <p className="content-condition">
                Status: {coolingFanCheck ? "ON" : "OFF"}
              </p>
            </div>
          </div>
        </div>
        <div className="row-container-2">
          <Table bordered>
            <thead>
              <tr>
                <th className="title-column">Devices Controls</th>
                <th className="title-status">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Glow Light</td>
                <td>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={glowLightCheck}
                      onClick={glowLightBtn}
                    />
                    <span class="slider round" />{" "}
                    {glowLightCheck ? "ON" : "OFF"}
                  </label>
                </td>
              </tr>
              <tr>
                <td>Cooling Fan</td>
                <td>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={coolingFanCheck}
                      onClick={coolingFanBtn}
                    />
                    <span class="slider round" />{" "}
                    {coolingFanCheck ? "ON" : "OFF"}
                  </label>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default Devices;
