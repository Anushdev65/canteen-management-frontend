import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../schema/YupSchema";
import MUIError from "../component/MUIError";
import { useForgotPasswordMutation } from "../services/api/admin/auth";
import { useNavigate } from "react-router-dom";
import MUILoading from "../component/MUILoading";
import MUIToast from "../component/MUIToast";

const initialValues = {
  email: "",
  confirmEmail: "",
};

export default function ForgotPassword() {
  const [forgotPassword, { isLoading, data, error }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  const { handleBlur, touched, errors, handleChange, handleSubmit, values } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values, action) => {
        forgotPassword({ email: values.email });
        action.resetForm();
      },
    });

  React.useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [data, navigate]);

  return (
    <>
      {data ? (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      ) : error ? (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      ) : (
        <></>
      )}
      {isLoading ? (
        <MUILoading />
      ) : (
        <Container component="main" maxWidth="xs" sx={{ mt: "5rem" }}>
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
            <Typography
              component="h6"
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: 14 }}
            >
              Fill up your email.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={touched.email && errors.email}
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="new-email"
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
                  <TextField
                    error={touched.confirmEmail && errors.confirmEmail}
                    required
                    fullWidth
                    name="confirmEmail"
                    label="Confirm Email"
                    type="email"
                    id="confirmEmail"
                    autoComplete="ConfirmEmail"
                    value={values.confirmEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MUIError
                    touch={touched.confirmEmail}
                    error={errors.confirmEmail}
                    value={false}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
