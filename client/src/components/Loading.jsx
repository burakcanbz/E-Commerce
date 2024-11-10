import { Spinner } from "react-bootstrap";

import React from "react";

const Loading = () => {
  return (
    <div
    style={{
      height: "40vh", 
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto auto",
          display: "block",
        }}
      ></Spinner>
    </div>
  );
};

export default Loading;
