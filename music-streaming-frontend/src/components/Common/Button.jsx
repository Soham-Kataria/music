import React from "react";

const Button = ({ children, onClick, type = "button", disabled, className, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`common-button ${className || ""}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
