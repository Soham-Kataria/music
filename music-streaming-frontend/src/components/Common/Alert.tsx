import React from "react";

interface AlertProps {
  type?: "error" | "success";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type = "error", message }) => {
  return (
    <div className={`alert ${type === "error" ? "alert-error" : "alert-success"}`}>
      {message}
    </div>
  );
};

export default Alert;
