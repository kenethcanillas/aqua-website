import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import "../App.css";
import "./Header.js";

import { app, db } from "../firebase";
// import { getFunctions, httpsCallable } from "firebase/functions";
import Swal from "sweetalert2";

import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { toDateTime } from "../utility/utility";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import PageItem from "react-bootstrap/PageItem";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import TempReport from "./Report/TempReport";
import HumReport from "./Report/HumReport";
import EcReport from "./Report/EcReport";
import PhReport from "./Report/PhReport";
import AllReport from "./Report/AllReport";
import ReportModal from "./ReportModal";
import { set } from "lodash";
import { CircularProgress } from "@mui/material";

function WaterLevel() {
  const [loading, setLoading] = useState(false);
  const [lightLoad, setLightLoad] = useState(false);
  const [waterData, setWaterData] = useState({});
  const [lightData, setLightData] = useState({});
  const w = query(collection(db, "water_level"), orderBy("datetime", "asc"));
  const l = query(
    collection(db, "light_resistance"),
    orderBy("datetime", "asc")
  );

  useEffect(() => {
    onSnapshot(w, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setWaterData(change.doc.data());
        }
      });
    });

    onSnapshot(l, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setLightData(change.doc.data());
        }
      });
    });
  });

  const functions = getFunctions(app, "asia-southeast1");
  const getAllSensorData = httpsCallable(functions, "getAllSensorData");

  // const [water, setTempData] = useState({});
  // const [humData, setHumData] = useState({});
  const [waterListData, setWaterListData] = useState([]);
  const [lightListData, setLightListData] = useState([]);
  // const [isFirst, setIsFirst] = useState(true);
  // const t = query(collection(db, "temperature"), orderBy("datetime", "asc"));
  // const h = query(collection(db, "humidity"), orderBy("datetime", "asc"));

  const [selectedSensor, setSelectedSensor] = useState("All");
  const [reports, setRerpots] = useState([]);

  const storage = getStorage();
  const [pageCount, setPageCount] = useState(0);
  const limitData = 10;
  const [currentPage, setCurrentTempPage] = useState(0);
  const [humPageCounts, setHumPageCounts] = useState(0);
  const [humCurrentPage, setHumCurrentPage] = useState(0);

  useEffect(() => {
    const listRef = ref(storage, "daily-reports/temperature");
    listAll(listRef).then((result) => {
      setRerpots(result.items);
    });
    getWater();
    getLight();
  }, []);

  const getWater = (pageIndex = 0) => {
    setLoading(true);
    getAllSensorData({
      collectionName: "water_level",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      console.log(result);
      setWaterListData(
        result.data.data.map((water) => ({
          ...water,
          datetime: toDateTime(water.datetime._seconds),
        }))
      );
      setLoading(false);
      setPageCount(result.data.count / limitData);
    });
  };
  const getLight = (pageIndex = 0) => {
    setLightLoad(true);
    getAllSensorData({
      collectionName: "light_resistance",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      setLightListData(
        result.data.data.map((light) => ({
          ...light,
          datetime: toDateTime(light.datetime._seconds),
        }))
      );
      setLightLoad(false);
      setHumPageCounts(result.data.count / limitData);
    });
  };
  const pageTemp = (isNext) => {
    // console.log(pageCount);
    if (isNext) {
      const nextPage = currentPage + 1;
      if (nextPage < pageCount) {
        getWater(nextPage);

        setCurrentTempPage(nextPage);
      }
    } else {
      const prevPage = currentPage - 1;
      if (prevPage >= 0) {
        getWater(prevPage);
        setCurrentTempPage(prevPage);
      }
    }
  };
  const pageHum = (isNext) => {
    if (isNext) {
      const nextPage = humCurrentPage + 1;
      if (nextPage < humPageCounts) {
        getLight(nextPage);
        setHumCurrentPage(nextPage);
      }
    } else {
      const prevPage = humCurrentPage - 1;
      if (prevPage >= 0) {
        getLight(prevPage);
        setHumCurrentPage(prevPage);
      }
    }
  };
  // loiding
  const checkLoad = () => {
    if (loading) {
      return <tr><td colSpan={3} ><div style={{display:"flex", justifyContent:"center"}}><CircularProgress /></div></td></tr>;
    } else {
      return waterListData.map((data) => (
        <tr>
          <td>{data.id}</td>
          <td>{data.datetime}</td>
          <td>
            {data.value}{" "}
            <Icon
                  icon="material-symbols:percent-rounded"
                  width="16"
                  height="16"
                />          </td>
        </tr>
      ));
    }
  };
  const checkLoadLight = () => {
    if (lightLoad) {
      return <tr><td colSpan={3} ><div style={{display:"flex", justifyContent:"center"}}><CircularProgress /></div></td></tr>;
    } else {
      return lightListData.map((data) => (
        <tr>
          <td>{data.id}</td>
          <td>{data.datetime}</td>
          <td>
            {data.value}{" "}
          </td>
        </tr>
      ));
    }
  };
  console.log(currentPage);
  const [searchReport, setSearchReport] = useState("");

  const searchReportFunc = (event) => {
    event.preventDefault();
    setSearchReport(event.target.value);
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    setSearchReport(event.target[0].value);
  };
  function displayReport(searchReport) {
    if (selectedSensor === "Temperature") {
      return <TempReport data={searchReport} />;
    } else if (selectedSensor === "Humidity") {
      return <HumReport data={searchReport} />;
    } else if (selectedSensor === "Ec Level") {
      return <EcReport data={searchReport} />;
    } else if (selectedSensor === "pH Level") {
      return <PhReport data={searchReport} />;
    } else {
      return <AllReport data={searchReport} />;
    }
  }

  const [ReportModalShow, setReportModalShow] = React.useState(false);

  return (
    <>
      <ReportModal
        show={ReportModalShow}
        onHide={() => setReportModalShow(false)}
        searchReport={searchReport}
        searchReportFunc={searchReportFunc}
        setSelectedSensor={setSelectedSensor}
        selectedSensor={selectedSensor}
        displayReport={displayReport}
        searchSubmit={searchSubmit}
      />

      <div class="db-greenhouse">
        <div class="db-buttons">
          <a
            onClick={() => setReportModalShow(true)}
            style={{ cursor: "pointer" }}
          >
            {<Icon icon="fluent-mdl2:report-document" width="16" height="16" />}{" "}
            Reports
          </a>
        </div>
        <div className="display-container">
          <div class="temperature-container">
            <div class="temperature-display">
              <h3>Water Leak 1</h3>
              <h2>
                {Object.keys(waterData).length !== 0
                  ? waterData.value + ""
                  : ""}{" "}
                <Icon
                  icon="material-symbols:percent-rounded"
                  width="42"
                  height="42"
                />
              </h2>
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
                  {/* WATER */}
                  {checkLoad()}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination size="md" className="pagination">
                        {/* <Pagination.First
                            disabled={currentTempPage === 1}
                            onClick={() => handlePageChange(1)}
                        /> */}
                        <Pagination.Prev
                          disabled={currentPage === 0}
                          onClick={() => pageTemp(false)}
                        >
                          Prev
                        </Pagination.Prev>

                        {/* {paginationItems} */}

                        <Pagination.Next onClick={() => pageTemp(true)}>
                          Next
                        </Pagination.Next>
                      </Pagination>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </div>

          <div class="humidity-container">
            <div class="humidity-display">
              <h3>Water Leak 2</h3>
              <h2>
                {Object.keys(lightData).length !== 0
                  ? lightData.value + ""
                  : ""}
                {/* <Icon icon="material-symbols:percent-rounded" width="42" height="42" /> */}
              </h2>
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
                  {/* LIGHT RESISTANCE */}
                  {checkLoadLight()}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination
                        size="md"
                        className="pagination"
                        //  active={currentTempPage}
                        //  totalPages={totalPages}
                        //  onChange={handlePageChange}
                      >
                        {/* <Pagination.First
                            disabled={HUMcurrentPage === 1}
                            onClick={() => HUMhandlePageChange(1)}
                        /> */}
                        <Pagination.Prev
                          disabled={humCurrentPage === 0}
                          onClick={() => pageHum(false)}
                        >
                          Prev
                        </Pagination.Prev>

                        {/* {HUMpaginationItems} */}

                        <Pagination.Next
                          // disabled={HUMcurrentPage === HUMtotalPages}
                          onClick={() => pageHum(true)}
                        >
                          Next
                        </Pagination.Next>

                        {/* <Pagination.Last
                              disabled={HUMcurrentPage === HUMtotalPages }
                              onClick={() => HUMhandlePageChange(HUMtotalPages)}>
                          </Pagination.Last> */}
                      </Pagination>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WaterLevel;
