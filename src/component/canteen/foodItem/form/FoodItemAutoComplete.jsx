import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function FoodItemAutoComplete({
  label,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <Autocomplete
      value={value === "" ? null : value}
      options={options}
      onChange={onChange}
      ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
      renderInput={(params) => (
        <TextField id="index" {...params} label={label} error={error} />
      )}
      isOptionEqualToValue={(option, value) => option.label === value}
    />
  );
}
