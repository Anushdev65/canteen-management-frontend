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
import { userRegistrationSchema } from "../schema/SignInSchema";
import MUIMultiSelect from "../component/MUIMultiSelect";
import MUIError from "../component/MUIError";
import MUIRadioGroup from "../component/MUIRadioGroup";
import { useRegisterUserMutation } from "../services/api/admin/auth";
import MUILoading from "../component/MUILoading";
import MUIToast from "../component/MUIToast";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: [],
  userImage: "",
  phoneNumber: "",
  gender: "",
};

export default function SignUp() {
  const [registerUser, { isLoading, data }] = useRegisterUserMutation();
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
        const body = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          roles: values.role,
          profile: "smile.png",
        };
        registerUser(body);
        action.resetForm();
      },
    });

  React.useEffect(() => {
    console.log("Data from backend ", data?.data, data?.message);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <MUILoading />
      ) : (
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    value={false}
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
                    value={false}
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
                    value={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MUIMultiSelect
                    error={touched.role && errors.role}
                    required
                    fullWidth
                    id="role"
                    label="User Type"
                    name="role"
                    autoComplete="off"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MUIError
                    touch={touched.role}
                    error={errors.role}
                    value={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={touched.phoneNumber && errors.phoneNumber}
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="off"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MUIError
                    touch={touched.phoneNumber}
                    error={errors.phoneNumber}
                    value={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MUIRadioGroup
                    error={touched.gender && errors.gender}
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    autoComplete="off"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MUIError
                    touch={touched.gender}
                    error={errors.gender}
                    value={false}
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
      )}
      {data ? <MUIToast initialValue={true} message={data.message} /> : <></>}
    </>
  );
}
