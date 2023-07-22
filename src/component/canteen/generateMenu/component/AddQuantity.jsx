import { TextField } from "@mui/material";
import React from "react";
import "../../../../foodstyles/generatetable.css";
const AddQuantity = ({ onChange, label, setValue, value }) => {
  const newHandle = (e) => {
    const updatedValue = e.target.value;
    onChange(updatedValue);
    setValue(updatedValue);
  };
  return (
    <TextField
      autoComplete="off"
      type="number"
      id="outlined-number"
      label={label}
      value={value}
      onChange={newHandle}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min: 0,
      }}
    />
  );
};

export default AddQuantity;
