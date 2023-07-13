import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FoodItemAutoComplete from "./FoodItemAutoComplete";

export default function FoodItemForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LunchDiningOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add Food Item
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
        name="signinform"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Food Name"
              name="name"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Food Description"
              name="description"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <FoodItemAutoComplete required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FoodItemAutoComplete required fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="rate"
              required
              fullWidth
              id="rate"
              label="Food Rate"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="discountedRate"
              label="Discounted Rate"
              name="discountedRate"
              autoComplete="family-name"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
}
