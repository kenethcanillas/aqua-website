import "../App.css";
import "./Header.js";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { db, app } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { toDateTime } from "../utility/utility";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

function WaterCondition() {
  const functions = getFunctions(app, "asia-southeast1");
  const getAllSensorData = httpsCallable(functions, "getAllSensorData");
  const [ecData, setEcData] = useState({});
  const [phData, setPhData] = useState({});
  const [ecListData, setEcListData] = useState([]);
  const [phListData, setPhListData] = useState([]);
  // const ref = collection(db, 'ec_level')
  useEffect(() => {
    const q = query(collection(db, "ec_level"), orderBy("datetime", "asc"));
    const p = query(collection(db, "ph_level"), orderBy("datetime", "asc"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setEcData(change.doc.data());
          getEc();
        }
      });
    });
    onSnapshot(p, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setPhData(change.doc.data());
          getPh();
        }
      });
    });
  }, []);
  function getPh() {
    getAllSensorData({ collectionName: "ph_level" }).then((result) => {
      setPhListData(
        result.data.data.map((phLevel) => ({
          ...phLevel,
          datetime: toDateTime(phLevel.datetime._seconds),
        }))
      );
    });
  }
  function getEc() {
    getAllSensorData({ collectionName: "ec_level" }).then((result) => {
      setEcListData(
        result.data.data.map((ecLevel) => ({
          ...ecLevel,
          datetime: toDateTime(ecLevel.datetime._seconds),
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
              <h3>PH Level</h3>
              <h2>
                {Object.keys(phData).length !== 0 ? phData.value : ""}{" "}
                <span
                  class="iconify"
                  data-icon="tabler:temperature-celsius"
                ></span>
              </h2>
              <p>Condition: Good</p>
            </div>
            <div class="temperature-data">
              <Table bordered hover className="table-container-bootstrap">
                <thead className="p-2">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Value Data </th>
                  </tr>
                </thead>
                <tbody>
                   {/* phlvel */}
                   {phListData.map((data) => (
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
              </Table>
              <Pagination size="md">
                <Pagination.First />
                <Pagination.Prev>Prev</Pagination.Prev>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
          <div class="humidity-container">
            <div class="humidity-display">
              <h3 className="title">Electrical Conductivity Level</h3>
              <h2>
              {Object.keys(ecData).length !== 0 ? ecData.value : ""}
                <span
                  class="iconify"
                  data-icon="tabler:temperature-celsius"
                ></span>
              </h2>
              <p>Condition: Good</p>
            </div>
            <div class="humidity-data">
              <Table bordered hover className="table-container-bootstrap">
                <thead className="p-2">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Value Data </th>
                  </tr>
                </thead>
                <tbody>
                  {/* eclevel table */}
                  {ecListData.map((data) => (
                    <tr>
                      <td>{data.datetime}</td>
                      <td>
                        {data.value}{" "}
                        <span
                          class="iconify"
                          data-icon="tabler:temperature-celsius"
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination size="md">
                <Pagination.First />
                <Pagination.Prev>Prev</Pagination.Prev>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WaterCondition;
