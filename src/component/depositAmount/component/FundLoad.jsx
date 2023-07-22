import { TextField } from "@mui/material";
import React from "react";
import "../../../foodstyles/generatetable.css";
const FundLoad = ({ onChange, label, values, onBlur, error, name }) => {
  return (
    <TextField
      name={name}
      error={error}
      autoComplete="off"
      id="outlined-number"
      label={label}
      value={values.amount}
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

export default FundLoad;
