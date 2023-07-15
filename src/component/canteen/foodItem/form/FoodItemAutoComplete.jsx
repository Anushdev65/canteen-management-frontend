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
  componentName,
  onBlur,
}) {
  const isOptionEqualToValue = (option, value) => {
    return option?.id === value?.id;
  };

  const handleAutocompleteChange = (event, newValue) => {
    onChange(event.target.name, newValue);
  };

  return (
    <>
      {componentName && (
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
                name={componentName}
                error={touched?.componentName && errors?.componentName}
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
