import { Spinner } from "react-bootstrap";

import type { JSX } from "react";

const Loading = (): JSX.Element => {
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
          color: "#0d6efd",
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
