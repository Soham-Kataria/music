import React from "react";

const Input = ({ type = "text", placeholder, value, onChange, className, style, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`common-input ${className || ""}`}
      style={style}
      {...rest}
    />
  );
};

export default Input;
