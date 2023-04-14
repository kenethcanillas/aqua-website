import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import "../App.css";
import "./Header.js";

// import { Icon } from '@iconify/react';
import React, { useEffect, useState } from "react";
import {db} from "../firebase";

export default function WaterLevel() {
  const [waterBtnCheck, setIsChecked1] = useState(false);
  const [snapABtnCheck, setIsChecked2] = useState(false);
  const [snapBBtnCheck, setIsChecked3] = useState(false);

  const waterBtn = () => {
    setIsChecked1(!waterBtnCheck);
  };
  const snapABtn = () => {
    setIsChecked2(!snapABtnCheck);
  };
  const snapBBtn = () => {
    setIsChecked3(!snapBBtnCheck);
  };
const [waterData, setWaterData] = useState({});
const [snapAData, setSnapAData] = useState({});
const [snapBData, setSnapBData] = useState({});
const w = query(collection(db,'water_level'), orderBy('datetime','asc'));
const a = query(collection(db,'snap_a'), orderBy('datetime','asc'));
const b = query(collection(db,'snap_b'), orderBy('datetime','asc'));

useEffect(()=>{
    onSnapshot(w, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setWaterData(change.doc.data());
          }
        });
      });
      onSnapshot(a, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setSnapAData(change.doc.data());
          }
        });
      });
      onSnapshot(b, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setSnapBData(change.doc.data());
          }
        });
      });
});

  return (
    <>
      <div class="container">
        <div class="row-container">
          <div class="column-1">
            <div class="column-content">
              <h3 className="content-title">Water</h3>
              <h2 className="content-value">
                {Object.keys(waterData).length !== 0 ? waterData.value : ""} <span className="value-icon">%</span>
              </h2>
              <p className="content-condition">Condition: Good</p>
            </div>
          </div>
          <div class="column-2">
            <div class="column-content">
              <h3 className="content-title">Snap A</h3>
              <h2 className="content-value">
              {Object.keys(snapAData).length !== 0 ? snapAData.value : ""}  <span className="value-icon">%</span>
              </h2>
              <p className="content-condition">Condition: Good</p>
            </div>
          </div>
          <div class="column-3">
            <div class="column-content">
              <h3 className="content-title">Snap B</h3>
              <h2 className="content-value">
              {Object.keys(snapBData).length !== 0 ? snapBData.value : ""}  <span className="value-icon">%</span>
              </h2>
              <p className="content-condition">Condition: Good</p>
            </div>
          </div>
        </div>
        <div className="row-container-2">
          <table className="table-container">
            <tr className="theads-title">
              <th className="title-column">Pump Controls</th>
              <th className="title-status">Status</th>
            </tr>
            <tr className="tbody-content">
              <td>Water Pump</td>
              <td>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={waterBtnCheck}
                    onClick={waterBtn}
                  />
                  <span class="slider round" /> {waterBtnCheck ? "ON" : "OFF"}
                </label>
              </td>
            </tr>
            <tr className="tbody-content">
              <td>Snap A Pump</td>
              <td>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={snapABtnCheck}
                    onClick={snapABtn}
                  />
                  <span class="slider round" /> {snapABtnCheck ? "ON" : "OFF"}
                </label>
              </td>
            </tr>
            <tr className="tbody-content">
              <td>Snap B Pump</td>
              <td>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={snapBBtnCheck}
                    onClick={snapBBtn}
                  />
                  <span class="slider round" /> {snapBBtnCheck ? "ON" : "OFF"}
                </label>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
