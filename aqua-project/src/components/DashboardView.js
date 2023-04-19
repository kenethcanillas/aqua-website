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
import PageItem from 'react-bootstrap/PageItem';

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
  function getTemp() {
    getAllSensorData({ collectionName: "temperature" }).then((result) => {
      setTempListData(
        result.data.data.map((temperature) => ({
          ...temperature,
          datetime: toDateTime(temperature.datetime._seconds),
        }))
      );
    });
  }
  function getHum() {
    getAllSensorData({ collectionName: "humidity" }).then((result) => {
      setHumListData(
        result.data.data.map((humidity) => ({
          ...humidity,
          datetime: toDateTime(humidity.datetime._seconds),
        }))
      );
    });
  }


  {/** TEMPERATURE PAGINATION */} 

  tempListData.forEach((item, i) => {
    item.id = i+ 1;
  });
  
  const [currentTempPage, setCurrentPage] = useState(1);
  const [itemsTempPerPage, setItemsPerPage] = useState(10);
  const totalItems = tempListData.length;
  const totalPages = Math.ceil(totalItems / itemsTempPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const startIndex = (currentTempPage - 1) * itemsTempPerPage;
  const endIndex = startIndex + itemsTempPerPage;

  // slice the array of items to display only the items for the current page
  const currentItems = tempListData.slice(startIndex, endIndex);

  const paginationItems = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
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
    item.id = i+ 1;
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
  const HUMcurrentItems = tempListData.slice(HUMstartIndex, HUMendIndex);

  const HUMpaginationItems = [];
  for (let HUMpageNumber = 1; HUMpageNumber <= HUMtotalPages; HUMpageNumber++) {
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
  return (
    <>
      <div class="db-greenhouse">
        <div class="db-buttons">
          <a href="#react">
            {<Icon icon="icon-park-outline:eyes" width="16" height="16" />} View
            All Data
          </a>
          <a href="#">
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
                <Icon icon="tabler:temperature-celsius" width="42" height="42" />
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
                  {currentItems.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td>{data.value} {<Icon icon="tabler:temperature-celsius" width="16" height="16" />}</td>                        
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <Pagination 
                        size="md" 
                        className="pagination" 
                      >
                         <Pagination.First
                            disabled={currentTempPage === 1}
                            onClick={() => handlePageChange(1)}
                        />
                          <Pagination.Prev
                            disabled={currentTempPage === 1}
                            onClick={() => handlePageChange(currentTempPage - 1)}>
                              Prev
                          </Pagination.Prev>
                          
                          {paginationItems}

                          <Pagination.Next
                              disabled={currentTempPage === totalPages}
                              onClick={() => handlePageChange(currentTempPage + 1)} >
                                Next
                          </Pagination.Next>

                          <Pagination.Last
                              disabled={currentTempPage === totalPages }
                              onClick={() => handlePageChange(totalPages)}>
                          </Pagination.Last>
                           
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
                <Icon icon="material-symbols:humidity-percentage-outline-rounded" width="42" height="42" />
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
                  {HUMcurrentItems.map((data) => (
                    <tr>
                      <td>{data.id}</td>
                      <td>{data.datetime}</td>
                      <td> 
                         {data.value}
                      </td>
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
                            disabled={HUMcurrentPage === 1}
                            onClick={() => HUMhandlePageChange(1)}
                        />
                          <Pagination.Prev
                            disabled={HUMcurrentPage === 1}
                            onClick={() => HUMhandlePageChange(HUMcurrentPage - 1)}>
                              Prev
                          </Pagination.Prev>
                          
                          {HUMpaginationItems}

                          <Pagination.Next
                              disabled={HUMcurrentPage === HUMtotalPages}
                              onClick={() => HUMhandlePageChange(HUMcurrentPage + 1)} >
                                Next
                          </Pagination.Next>

                          <Pagination.Last
                              disabled={HUMcurrentPage === HUMtotalPages }
                              onClick={() => HUMhandlePageChange(HUMtotalPages)}>
                          </Pagination.Last>
                           
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
export default DashboardView;
