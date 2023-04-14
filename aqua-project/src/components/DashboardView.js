import "../App.css";
import "./Header.js";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { db, app } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { toDateTime } from "../utility/utility";

function DashboardView() {
  const functions = getFunctions(app, "asia-southeast1");
  const getAllSensorData = httpsCallable(functions, "getAllSensorData");
  const [tempData, setTempData] = useState({});
  const [humData, setHumData] = useState({});
  const [humListData, setHumListData] = useState([]);
  const [tempListData, setTempListData] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const t = query(collection(db, "temperature"), orderBy("datetime", "asc"));
  const h = query(collection(db, "humidity"), orderBy("datetime", "asc"));
  useEffect(() => {
    onSnapshot(t, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setTempData(change.doc.data());
          getTemp();
        }
      });
    });
    onSnapshot(h, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setHumData(change.doc.data());
          getHum();
        }
      });
    });

    
  }, []);
function getTemp(){
  getAllSensorData({ collectionName: "temperature" }).then((result) => {
    setTempListData(
      result.data.data.map((temperature) => ({
        ...temperature,
        datetime: toDateTime(temperature.datetime._seconds),
      }))
    );
  });
}
function getHum(){
  getAllSensorData({ collectionName: "humidity" }).then((result) => {
    setHumListData(
      result.data.data.map((humidity) => ({
        ...humidity,
        datetime: toDateTime(humidity.datetime._seconds),
      }))
    );
  });
}

  return (
    <>
      <div class="db-greenhouse">
        <div class="db-buttons">
          <a href="#">
            {<Icon icon="icon-park-outline:eyes" width="16" height="16" />} View
            All Data
          </a>
          <a href="#">
            {<Icon icon="fluent-mdl2:report-document" width="16" height="16" />}{" "}
            Reports
          </a>
        </div>
        <div class="display-container">
          <div class="temperature-container">
            <div class="temperature-display">
              <h3>Temperature</h3>
              <h2>
                {Object.keys(tempData).length !== 0 ? tempData.value + "%" : ""}
                {}
                <span
                  class="iconify"
                  data-icon="tabler:temperature-celsius"
                ></span>
              </h2>
              <p>Condition: Good</p>
            </div>
            <div class="temperature-data">
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Value Data </th>
                  </tr>
                </thead>
                <tbody>
                  {/* temperature */}

                  {tempListData.map((data) => (
                    <tr>
                      <td>{data.datetime}</td>
                      <td>
                        {data.value}
                        <span
                          class="iconify"
                          data-icon="tabler:temperature-celsius"
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="humidity-container">
            <div class="humidity-display">
              <h3>Humidity</h3>
              <h2>
                {Object.keys(humData).length !== 0 ? humData.value + "%" : ""}
                <span
                  class="iconify"
                  data-icon="tabler:temperature-celsius"
                ></span>
              </h2>
              <p>Condition: Good</p>
            </div>
            <div class="humidity-data">
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Value Data </th>
                  </tr>
                </thead>
                <tbody>
                  {/* humidty table */}
                  {humListData.map((data) => (
                    <tr>
                      <td>{data.datetime}</td>
                      <td>
                        {data.value}
                        <span
                          class="iconify"
                          data-icon="tabler:temperature-celsius"
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashboardView;
