import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{
          width: "70px", // Custom width
          height: "70px", // Custom height
          borderWidth: "5px", // Custom border width
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
