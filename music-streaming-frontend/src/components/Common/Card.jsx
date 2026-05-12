import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const Card = () => {
  const [first, setFirst] = useState(0);
  const [input, setInput] = useState("");
  const handleClick = () => {
    setFirst(first + 1);
    console.log(first);
  };

  

  return (
    <div className="card">
      {first}
      <Button children={"Tncrement"} onClick={handleClick} />
      <Button children={"Jainish"} />
      <Input style={{ width: "25%" }} onChange={(e)=>(setInput(e.target.value))} />
      <p style={{ color:"white" }}>{input}</p>
    </div>
  );
};

export default Card;
