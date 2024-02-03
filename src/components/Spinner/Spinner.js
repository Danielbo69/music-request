import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{height: '100vh', backgroundColor: '#161616'}}>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
