import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "../../../../foodstyles/generatetable.css";
import React from "react";

const FoodAvailableTime = ({ value, handleFromChange, handleToChange }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            className="foodavilable-time"
            label={handleFromChange ? "Available From" : "Avaiable Upto"}
            value={value}
            onChange={handleFromChange || handleToChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default FoodAvailableTime;
