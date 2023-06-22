import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import DropZoneComp from "../component/DropZoneComp";
import { userRegistrationSchema } from "./SignInSchema";
import MUIMultiSelect from "../component/MUIMultiSelect";
import MUIError from "../component/MUIError";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  userType: [],
  userImage: "",
};

export default function SignUp() {
  const handleImageUpload = (image) => {
    handleChange({
      target: {
        name: "userImage",
        value: image,
      },
    });
    handleBlur({
      target: {
        name: "userImage",
      },
    });
  };

  const { handleBlur, touched, errors, handleChange, handleSubmit, values } =
    useFormik({
      initialValues,
      validationSchema: userRegistrationSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={touched.firstName && errors.firstName}
                autoComplete="off"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <MUIError
                touch={touched.firstName}
                error={errors.firstName}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={touched.lastName && errors.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="Last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <MUIError
                touch={touched.lastName}
                error={errors.lastName}
                value={values.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={touched.email && errors.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <MUIError
                touch={touched.email}
                error={errors.email}
                value={values.email}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                error={touched.password && errors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <Typography variant="body2" color="error">
                  {errors.password}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={touched.confirmPassword && errors.confirmPassword}
                required
                fullWidth
                name="confirmPassword"
                label="ConfirmPassword"
                defaultValue={"CP"}
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="ConfirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Typography variant="body2" color="error">
                  {errors.confirmPassword}
                </Typography>
              )}
            </Grid> */}
            <Grid item xs={12}>
              <MUIMultiSelect
                error={touched.userType && errors.userType}
                required
                fullWidth
                id="userType"
                label="User Type"
                name="userType"
                autoComplete="off"
                value={values.userType}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <MUIError
                touch={touched.userType}
                error={errors.userType}
                value={values.userType}
              />
            </Grid>
            <Grid item xs={12}>
              <DropZoneComp
                error={touched.userImage && errors.userImage}
                required
                fullWidth
                id="userImage"
                name="userImage"
                autoComplete="off"
                value={values.userImage}
                onChange={handleChange}
                onBlur={handleBlur}
                handleImageUpload={handleImageUpload}
              />
              <MUIError
                touch={touched.userImage}
                error={errors.userImage}
                value={values.userImage}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
