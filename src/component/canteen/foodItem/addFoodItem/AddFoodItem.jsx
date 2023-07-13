import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import DropZoneComp from "../../../DropZoneComp";
import FoodItemForm from "../form/FoodItemForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme();

export default function AddFoodItem() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={2}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <FoodItemForm />
          </Container>
        </ThemeProvider>
      </Grid>
      <Grid container spacing={2}>
        <Grid item mt={19}>
          <DropZoneComp />
        </Grid>
      </Grid>
    </Box>
  );
}
