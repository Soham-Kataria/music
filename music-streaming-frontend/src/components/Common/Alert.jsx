import React from "react";

const Alert = ({ type = "error", message }) => {
  return (
    <div className={`alert ${type === "error" ? "alert-error" : "alert-success"}`}>
      {message}
    </div>
  );
};

export default Alert;
