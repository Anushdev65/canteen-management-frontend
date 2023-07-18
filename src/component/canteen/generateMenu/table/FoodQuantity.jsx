import { TextField } from "@mui/material";
import React, { useState } from "react";

const FoodQuantity = ({ onChange, label, value }) => {
  const [newValue, setNewValue] = useState(value);

  const newHandle = (e) => {
    const updatedValue = e.target.value;
    setNewValue(e.target.value);
    onChange(updatedValue);
  };
  return (
    <TextField
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