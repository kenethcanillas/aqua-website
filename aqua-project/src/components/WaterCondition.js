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
import ReportModal from "./ReportModal";
import TempReport from "./Report/TempReport";
import HumReport from "./Report/HumReport";
import EcReport from "./Report/EcReport";
import PhReport from "./Report/PhReport";
import AllReport from "./Report/AllReport";

function WaterCondition() {
  const functions = getFunctions(app, "asia-southeast1");
  const getAllSensorData = httpsCallable(functions, "getAllSensorData");
  const [ecData, setEcData] = useState({});
  const [phData, setPhData] = useState({});
  const [ecListData, setEcListData] = useState([]);
  const [phListData, setPhListData] = useState([]);
  // const ref = collection(db, 'ec_level')
  const [pageCount, setPageCount] = useState(0);
  const limitData = 10;
  const [currentPage, setCurrentTempPage] = useState(0);
  const [ecPageCounts, setEcPageCounts] = useState(0);
  const [ecCurrentPage, setEcCurrentPage] = useState(0);
  useEffect(() => {
    const q = query(collection(db, "ec_level"), orderBy("datetime", "asc"));
    const p = query(collection(db, "ph_level"), orderBy("datetime", "asc"));
    getEc();
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setEcData(change.doc.data());
        }
      });
    });
    getPh();
    onSnapshot(p, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setPhData(change.doc.data());
        }
      });
    });
  }, []);
  const getPh = (pageIndex = 0) => {
    getAllSensorData({
      collectionName: "ph_level",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      setPhListData(
        result.data.data.map((phLevel) => ({
          ...phLevel,
          datetime: toDateTime(phLevel.datetime._seconds),
        }))
      );
      setPageCount(result.data.count / limitData);
    });
  };

  const pagePh = (isNext) => {
    if (isNext) {
      const nextPage = currentPage + 1;
      if (nextPage < pageCount) {
        getPh(nextPage);
        setCurrentTempPage(nextPage);
      }
    } else {
      const prevPage = currentPage - 1;
      if (prevPage >= 0) {
        getPh(prevPage);
        setCurrentTempPage(prevPage);
      }
    }
  };
  const getEc = (pageIndex = 0) => {
    getAllSensorData({
      collectionName: "ec_level",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      setEcListData(
        result.data.data.map((ecLevel) => ({
          ...ecLevel,
          datetime: toDateTime(ecLevel.datetime._seconds),
        }))
      );
      setEcPageCounts(result.data.count / limitData);
    });
  };

  const pageEc = (isNext) => {
    if (isNext) {
      const nextPage = ecCurrentPage + 1;
      if (nextPage < ecPageCounts) {
        getEc(nextPage);
        setEcCurrentPage(nextPage);
      }
    } else {
      const prevPage = ecCurrentPage - 1;
      if (prevPage >= 0) {
        getEc(prevPage);
        setEcCurrentPage(prevPage);
      }
    }
  };

  /*PH Level PAGINATION*/

  phListData.forEach((item, i) => {
    item.id = i + 1;
  });

  const [PHcurrentPage, PHsetCurrentPage] = useState(1);
  const [PHitemsPerPage, PHsetItemsPerPage] = useState(10);
  const PHtotalItems = phListData.length;
  const PHtotalPages = Math.ceil(PHtotalItems / PHitemsPerPage);

  const PHhandlePageChange = (page) => {
    PHsetCurrentPage(page);
  };

  const PHstartIndex = (PHcurrentPage - 1) * PHitemsPerPage;
  const PHendIndex = PHstartIndex + PHitemsPerPage;

  // slice the array of items to display only the items for the current page
  const PHcurrentItems = phListData.slice(PHstartIndex, PHendIndex);

  const PHpaginationItems = [];
  for (let PHpageNumber = 1; PHpageNumber <= PHtotalPages; PHpageNumber++) {
    PHpaginationItems.push(
      <Pagination.Item
        key={PHpageNumber}
        active={PHpageNumber === PHcurrentPage}
        onClick={() => PHhandlePageChange(PHpageNumber)}
      >
        {PHpageNumber}
      </Pagination.Item>
    );
  }

  /*ECL PAGINATION*/

  ecListData.forEach((item, i) => {
    item.id = i + 1;
  });

  const [ECcurrentPage, ECsetCurrentPage] = useState(1);
  const [ECitemsPerPage, ECsetItemsPerPage] = useState(10);
  const ECtotalItems = ecListData.length;
  const ECtotalPages = Math.ceil(ECtotalItems / ECitemsPerPage);

  const EChandlePageChange = (page) => {
    ECsetCurrentPage(page);
  };

  const ECstartIndex = (ECcurrentPage - 1) * ECitemsPerPage;
  const ECendIndex = ECstartIndex + ECitemsPerPage;

  // slice the array of items to display only the items for the current page
  const ECcurrentItems = ecListData.slice(ECstartIndex, ECendIndex);

  const ECpaginationItems = [];
  for (let ECpageNumber = 1; ECpageNumber <= ECtotalPages; ECpageNumber++) {
    ECpaginationItems.push(
      <Pagination.Item
        key={ECpageNumber}
        active={ECpageNumber === ECcurrentPage}
        onClick={() => EChandlePageChange(ECpageNumber)}
      >
        {ECpageNumber}
      </Pagination.Item>
    );
  }
  const [ReportModalShow, setReportModalShow] = useState(false);
  const [searchReport, setSearchReport] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("All");

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
          {/* <a href="#">
            {<Icon icon="icon-park-outline:eyes" width="16" height="16" />} View
            All Data
          </a> */}
          <a onClick={() => setReportModalShow(true)}
          style={{cursor: "pointer"}}>
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
                <Icon
                  icon="material-symbols:water-ph-outline-rounded"
                  width="42"
                  height="42"
                />
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
                  {PHcurrentItems.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td> {data.value}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination size="md" className="pagination">
                        <Pagination.First
                          disabled={PHcurrentPage === 1}
                          onClick={() => PHhandlePageChange(1)}
                        />
                        <Pagination.Prev
                          disabled={currentPage === 0}
                          onClick={() => pagePh(false)}
                        >
                          Prev
                        </Pagination.Prev>

                        {/* {PHpaginationItems} */}

                        <Pagination.Next
                          // disabled={PHcurrentPage === PHtotalPages}
                          onClick={() => pagePh(true)}
                        >
                          Next
                        </Pagination.Next>

                        <Pagination.Last
                          disabled={PHcurrentPage === PHtotalPages}
                          onClick={() => PHhandlePageChange(PHtotalPages)}
                        ></Pagination.Last>
                      </Pagination>
                    </td>
                  </tr>
                </tfoot>
              </Table>
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
                  {ECcurrentItems.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td> {data.value}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination size="md" className="pagination">
                        <Pagination.First
                          disabled={ECcurrentPage === 1}
                          onClick={() => EChandlePageChange(1)}
                        />
                        <Pagination.Prev
                          disabled={ecCurrentPage === 0}
                          onClick={() => pageEc(false)}
                        >
                          Prev
                        </Pagination.Prev>

                        {/* {ECpaginationItems} */}

                        <Pagination.Next
                          // disabled={ECcurrentPage === ECtotalPages}
                          onClick={() => pageEc(true)}
                        >
                          Next
                        </Pagination.Next>

                        <Pagination.Last
                          disabled={ECcurrentPage === ECtotalPages}
                          onClick={() => EChandlePageChange(ECtotalPages)}
                        ></Pagination.Last>
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
export default WaterCondition;
