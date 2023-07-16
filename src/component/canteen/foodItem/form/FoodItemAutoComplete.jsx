import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function FoodItemAutoComplete({
  label,
  value,
  onChange,
  options,
  errors,
  touched,
  onBlur,
  name,
}) {
  const isOptionEqualToValue = (option, value) => {
    return option?.id === value?.id;
  };

  const handleAutocompleteChange = (event, newValue) => {
    onChange(event.target.name, newValue);
  };

  return (
    <>
      {name && (
        <React.Fragment>
          <Autocomplete
            value={value === "" ? null : value}
            options={options}
            onChange={handleAutocompleteChange}
            ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
            renderInput={(params) => (
              <TextField
                id="index"
                label={label}
                onBlur={onBlur}
                name={name}
                error={Boolean(touched?.[name] && errors?.[name])}
                {...params}
              />
            )}
            isOptionEqualToValue={isOptionEqualToValue}
          />
        </React.Fragment>
      )}
    </>
  );
}
