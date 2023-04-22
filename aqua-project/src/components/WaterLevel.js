import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import "../App.css";
import "./Header.js";

import { Icon } from "@iconify/react";
import Table from "react-bootstrap/esm/Table";
import React, { useEffect, useState } from "react";
import { app, db } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";

function WaterLevel() {
  const functions = getFunctions(app, "asia-southeast1");
  const scheduler = httpsCallable(functions, "scheduler");
  const [waterBtnCheck, setIsChecked1] = useState(false);
  const [airBtnCheck, setIsChecked2] = useState(false);
  // const [snapABtnCheck, setIsChecked2] = useState(false);
  // const [snapBBtnCheck, setIsChecked3] = useState(false);

  const waterBtn = (event) => {
    event.preventDefault();
  };
  const airBtn = (event) => {};
  // const snapABtn = () => {
  //     setIsChecked2(!snapABtnCheck);
  //   };
  // const snapBBtn = () => {
  //     setIsChecked3(!snapBBtnCheck);
  // };

  const [waterData, setWaterData] = useState({});
  const w = query(collection(db, "water_level"), orderBy("datetime", "asc"));
  useEffect(() => {
    onSnapshot(w, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setWaterData(change.doc.data());
        }
      });
    });

    onSnapshot(doc(db, "scheduler", "water_pump"), (data) => {
      setIsChecked1(data.data().switch);
    });
    onSnapshot(doc(db, "scheduler", "air_pump"), (data) => {
      setIsChecked2(data.data().switch);
    });
    // onSnapshot(a, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       setSnapAData(change.doc.data());
    //     }
    //   });
    // });
    // onSnapshot(b, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       setSnapBData(change.doc.data());
    //     }
    //   });
    // });
  });
  const waterPumpBtn = (event) => {
    event.preventDefault();
    if (waterBtnCheck) {
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
          title: "Air Pump is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  const airPumpBtn = (event) => {
    event.preventDefault();
    if (airBtnCheck) {
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
          title: "Air Pump is OFF",
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
          title: "Water Pump is ON",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };
  return (
    <>
      <div class="container  pt-4">
        <div className="row-container">
          <div class="column-1">
            <div class="column-content p-xs-2">
              <h3 className="content-title">Water</h3>
              <h2 className="content-value">
                {Object.keys(waterData).length !== 0
                  ? waterData.value + ""
                  : ""}
                {/* {<Icon icon="icon-park-outline:percentage" className="waterPercentIcon" width="32" height="32"/>} */}
              </h2>
              <p className="content-condition">Condition: Good</p>
            </div>
          </div>
          <div class="column-2">
            <div class="column-content p-xs-2">
              <h3 className="content-title">Air Pump</h3>
              <h2 className="content-value">
                {
                  <Icon
                    icon="ic:round-heat-pump"
                    width="75"
                    height="75"
                    style={{ color: airBtnCheck ? "#378936" : "black" }}
                  ></Icon>
                }
              </h2>
              <p className="content-condition">
                Status: {airBtnCheck ? "ON" : "OFF"}
              </p>
            </div>
          </div>
        </div>
        <div className="row-container-2">
          <Table bordered>
            <thead>
              <tr>
                <th className="title-column">Pump Controls</th>
                <th className="title-status">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Water Pump</td>
                <td>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={waterBtnCheck}
                      onClick={waterPumpBtn}
                    />
                    <span class="slider round" /> {waterBtnCheck ? "ON" : "OFF"}
                  </label>
                </td>
              </tr>
              <tr>
                <td>Air Pump</td>
                <td>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={airBtnCheck}
                      onClick={airPumpBtn}
                    />
                    <span class="slider round" /> {airBtnCheck ? "ON" : "OFF"}
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
export default WaterLevel;
