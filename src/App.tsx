import React, { useState } from "react";
import "./App.css";

const BASE_URL = "http://localhost:3200";

const axios = require("axios");

function App() {
  const [report, setReport] = useState<any>(null);

  const handleGenerateFile = () => {
    axios.get(`${BASE_URL}/generate-report`).then(function (res: any) {
      alert("Report Generated");
      setReport({ ...res.data, show: false });
    });
  };

  const handleShowReport = () => {
    axios.get(`${BASE_URL}/get-report`).then(function (res: any) {
      setReport({ ...res.data, show: true });
    });
  };

  return (
    <main className="flex-shrink-0">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <button className="btn btn-primary" onClick={handleGenerateFile}>
              Generate
            </button>
          </div>
        </div>

        {report ? (
          <>
            <div className="row">
              <span>
                Link:
                <a href={`${BASE_URL}/download-report/${report?.fileAddress}`}>
                  Download link
                </a>
              </span>
            </div>

            <div className="row">
              <div className="col-4 flex">
                <button className="btn btn-primary" onClick={handleShowReport}>
                  Report
                </button>
              </div>
            </div>

            {report?.show
              ? report?.reports.map((rp: any, index: number) => (
                  <div key={index} className="row">
                    <div className="col-3">{rp}</div>
                  </div>
                ))
              : null}
          </>
        ) : null}
      </div>
    </main>
  );
}

export default App;
