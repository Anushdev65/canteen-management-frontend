import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const MUIRadioGroup = ({ value, onChange, onBlur, error, touched }) => {
  return (
    <>
      <FormLabel>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        value={value}
        error={touched && error}
        required
        id="gender"
        label="User Type"
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </>
  );
};

export default MUIRadioGroup;
