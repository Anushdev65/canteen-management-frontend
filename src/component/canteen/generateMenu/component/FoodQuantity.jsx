import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../../../../foodstyles/generatetable.css";
const FoodQuantity = ({ onChange, label, value, disable }) => {
  const [newValue, setNewValue] = useState(value);

  const newHandle = (e) => {
    const updatedValue = e.target.value;
    setNewValue(e.target.value);
    onChange(updatedValue);
  };
  return (
    <TextField
      className="foodquantity"
      disabled={disable}
      required
      autoComplete="off"
      id="outlined-number"
      label={label}
      value={newValue}
      onChange={newHandle}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default FoodQuantity;
