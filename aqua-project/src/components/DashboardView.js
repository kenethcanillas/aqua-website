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
    getTemp();
    //
    onSnapshot(t, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setTempData(change.doc.data());
        }
      });
    });
    getHum();
    onSnapshot(h, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setHumData(change.doc.data());
        }
      });
    });
  }, []);
  {
    /* reports*/
  }
  // const viewPdf = (e, path) => {
  //   e.preventDefault();

  //   getDownloadURL(ref(storage, path)).then((url) => {
  //     window.open(url, "_blank");
  //   });
  // };

  // const downloadPdf = (e, path) => {
  //   e.preventDefault();
  //   getDownloadURL(ref(storage, path)).then((url) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const document = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //   });
  // };
  const getTemp = (pageIndex = 0) => {
    getAllSensorData({
      collectionName: "temperature",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      console.log(result);
      setTempListData(
        result.data.data.map((temperature) => ({
          ...temperature,
          datetime: toDateTime(temperature.datetime._seconds),
        }))
      );
      setPageCount(result.data.count / limitData);
    });
  };
  const getHum = (pageIndex = 0) => {
    getAllSensorData({
      collectionName: "humidity",
      pageIndex,
      limit: limitData,
    }).then((result) => {
      setHumListData(
        result.data.data.map((humidity) => ({
          ...humidity,
          datetime: toDateTime(humidity.datetime._seconds),
        }))
      );
      setHumPageCounts(result.data.count / limitData);
    });
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

  {
    /** TEMPERATURE PAGINATION */
  }

  tempListData.forEach((item, i) => {
    item.id = i + 1;
  });

  // temperature page ni noe
  const pageTemp = (isNext) => {
    // console.log(pageCount);
    if (isNext) {
      const nextPage = currentPage + 1;
      if (nextPage < pageCount) {
        getTemp(nextPage);
        setCurrentTempPage(nextPage);
      }
    } else {
      const prevPage = currentPage - 1;
      if (prevPage >= 0) {
        getTemp(prevPage);
        setCurrentTempPage(prevPage);
      }
    }
  };
  const pageHum = (isNext) => {
    if (isNext) {
      const nextPage = humCurrentPage + 1;
      if (nextPage < humPageCounts) {
        getHum(nextPage);
        setHumCurrentPage(nextPage);
      }
    } else {
      const prevPage = humCurrentPage - 1;
      if (prevPage >= 0) {
        getHum(prevPage);
        setHumCurrentPage(prevPage);
      }
    }
  };
  const [currentTempPage, setCurrentPage] = useState(1);
  const [itemsTempPerPage, setItemsPerPage] = useState(10);
  const totalItems = tempListData.length;
  const totalPages = Math.ceil(totalItems / itemsTempPerPage);

  const handlePageChange = () => {
    // setCurrentPage(page);
    // pageTemp(true);
  };

  const startIndex = (currentTempPage - 1) * itemsTempPerPage;
  const endIndex = startIndex + itemsTempPerPage;

  // slice the array of items to display only the items for the current page
  const currentItems = tempListData.slice(startIndex, endIndex);

  const paginationItems = [];
  for (let pageNumber = 1; pageNumber <= 10; pageNumber++) {
    paginationItems.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentTempPage}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }

  /* HUMIDITY PAGINATION */

  humListData.forEach((item, i) => {
    item.id = i + 1;
  });

  const [HUMcurrentPage, HUMsetCurrentPage] = useState(1);
  const [HUMitemsPerPage, HUMsetItemsPerPage] = useState(10);
  const HUMtotalItems = humListData.length;
  const HUMtotalPages = Math.ceil(HUMtotalItems / HUMitemsPerPage);

  const HUMhandlePageChange = (page) => {
    HUMsetCurrentPage(page);
  };

  const HUMstartIndex = (HUMcurrentPage - 1) * HUMitemsPerPage;
  const HUMendIndex = HUMstartIndex + HUMitemsPerPage;

  // slice the array of items to display only the items for the current page
  const HUMcurrentItems = humListData.slice(HUMstartIndex, HUMendIndex);

  const HUMpaginationItems = [];
  for (let HUMpageNumber = 1; HUMpageNumber <= 10; HUMpageNumber++) {
    HUMpaginationItems.push(
      <Pagination.Item
        key={HUMpageNumber}
        active={HUMpageNumber === HUMcurrentPage}
        onClick={() => HUMhandlePageChange(HUMpageNumber)}
      >
        {HUMpageNumber}
      </Pagination.Item>
    );
  }

  /**REPORT MODAL*/

  const [ReportModalShow, setReportModalShow] = useState(false);

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
              <h3>Temperature</h3>
              <h2>
                {Object.keys(tempData).length !== 0 ? tempData.value + "" : ""}{" "}
                <Icon
                  icon="tabler:temperature-celsius"
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
                  {/* temperature */}
                  {tempListData.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td>
                        {data.value}{" "}
                        {
                          <Icon
                            icon="tabler:temperature-celsius"
                            width="16"
                            height="16"
                          />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination size="md" className="pagination">
                        <Pagination.First
                          // disabled={currentTempPage === 1}
                          onClick={() => handlePageChange(1)}
                        />
                        <Pagination.Prev
                          disabled={currentPage === 0}
                          onClick={() => pageTemp(false)}
                        >
                          Prev
                        </Pagination.Prev>

                        {/* {paginationItems} */}

                        <Pagination.Next
                          // disabled={currentTempPage === totalPages}
                          onClick={() => pageTemp(true)}
                        >
                          Next
                        </Pagination.Next>

                        <Pagination.Last
                          disabled={currentTempPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
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
              <h3>Humidity</h3>
              <h2>
                {Object.keys(humData).length !== 0 ? humData.value + "" : ""}
                <Icon
                  icon="material-symbols:humidity-percentage-outline-rounded"
                  width="42"
                  height="42"
                />
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
                  {/* humidty table */}
                  {humListData.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td>{data.value}</td>
                    </tr>
                  ))}
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
                        <Pagination.First
                          // disabled={HUMcurrentPage === 1}
                          onClick={() => HUMhandlePageChange(1)}
                        />
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

                        <Pagination.Last
                          // disabled={(currentPage === 0)}
                          onClick={() => HUMhandlePageChange(HUMtotalPages)}
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
        <Modal.Title>Reports</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="Report-Options mb-3">
          <div className="dropdown">
            <Dropdown variant="light" className="d-inline mx-2">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                style={{ width: "100px" }}
              >
                {props.selectedSensor}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    props.setSelectedSensor("Temperature");
                  }}
                >
                  Temperature
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("Humidity")}
                >
                  Humidity
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("pH Level")}
                >
                  PH Level
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => props.setSelectedSensor("Ec Level")}
                >
                  Electrical Conductivity
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="search">
            {<Icon icon="ic:outline-filter-alt" width="24" height="24" />}
            <form onSubmit={props.searchSubmit}>
              <input
                type="text"
                placeholder="Search"
                className="mx-2"
                onChange={props.searchReportFunc}
                value={props.searchReport}
              />
              <button type="submit" className="bg-success ">
                Search
              </button>
            </form>
          </div>
        </div>
        <div style={{ height: "400px", overflowY: "scroll" }}>
          <h3></h3>
          <Table bordered hover>
            <thead className="p-2">
              <tr>
                <th style={{ display: "flex", justifyContent: "center" }}>
                  Date
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* reports*/}
              {props.displayReport(props.searchReport)}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          className="modalSaveBtn py-3 "
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          className="modalSaveBtn py-3 px-5 "
          onClick={props.onHide}
        >
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DashboardView;
