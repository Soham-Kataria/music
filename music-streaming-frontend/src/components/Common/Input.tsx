import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "", 
  style, 
  ...rest 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`common-input ${className}`}
      style={style}
      {...rest}
    />
  );
};

export default Input;
