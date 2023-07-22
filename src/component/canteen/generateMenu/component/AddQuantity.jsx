import { TextField } from "@mui/material";
import React from "react";
import "../../../../foodstyles/generatetable.css";
const AddQuantity = ({ onChange, label, values, onBlur, error, name }) => {
  return (
    <TextField
      type="number"
      name={name}
      error={error}
      autoComplete="off"
      id="outlined-number"
      label={label}
      value={values.quantity}
      onChange={onChange}
      onBlur={onBlur}
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
