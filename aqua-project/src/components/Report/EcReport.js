import Button from "react-bootstrap/Button";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

function EcReport(props) {
  const storage = getStorage();
  const [reports, setRerpots] = useState([]);

  const listRef = ref(storage, "daily-reports/ec_level");
  useEffect(() => {
    listAll(listRef).then((result) => {
      setRerpots(result.items);
    });
  }, []);

  useEffect(() => {
    listAll(listRef).then((result) => {
      setRerpots(
        result.items.filter((report) => report.name.includes(props.data))
      );
    });
  }, [props.data]);

  const viewPdf = (e, path) => {
    e.preventDefault();

    getDownloadURL(ref(storage, path)).then((url) => {
      window.open(url, "_blank");
    });
  };
  return (
    <>
      {reports.map((data) => (
        <tr>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              {data.name}
            </div>
          </td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                width={20}
                style={{ width: "100px" }}
                onClick={(e) => viewPdf(e, data.fullPath)}
              >
                Download
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default EcReport;
