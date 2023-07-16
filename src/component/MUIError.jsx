import React from "react";
import Typography from "@mui/material/Typography";

const MUIError = ({ touch, error, value }) => {
  if (touch && error && !value) {
    return (
      <Typography variant="body2" color="error">
        {String(error)}
      </Typography>
    );
  }
  return null;
};

export default MUIError;
