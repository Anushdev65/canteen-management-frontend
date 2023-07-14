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
import { userLoginSchema } from "../schema/YupSchema";
import MUIError from "../component/MUIError";
import { useLoginUserMutation } from "../services/api/admin/auth";
import MUIToast from "../component/MUIToast";
import { setLevelInfo, setUSerInfo } from "../localStorage/localStorage";
import { useNavigate } from "react-router-dom";
import MUILoading from "../component/MUILoading";
import "../styles/login.css";

const initialValues = {
  password: "",
  email: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
  const { handleBlur, touched, errors, handleChange, handleSubmit, values } =
    useFormik({
      initialValues,
      validationSchema: userLoginSchema,
      onSubmit: (values, action) => {
        loginUser(values);
        action.resetForm();
      },
    });

  React.useEffect(() => {
    setLevelInfo({
      token: data?.data.token,
    });
    setUSerInfo({ user: data?.data.user });
    if (data?.data.token) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [data, navigate]);

  return (
    <>
      <div className="login-container">
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
        {isLoading || data ? (
          <MUILoading />
        ) : (
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              height: "475px",
              paddingTop: "5px",
              borderRadius: "20px",
              opacity: 1.21,
              boxShadow: "7px 7px 6px 0 rgba(0, 0, 0, 0.4)",
              transition: "box-shadow 0.3",
              "&:hover": { boxShadow: "12px 12px 6px 0 rgba(0, 0, 0, 0.4)" },
            }}
          >
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
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ marginTop: "20px" }}>
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
                  <Grid item xs={12} sx={{ marginTop: "10px" }}>
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
                    <MUIError
                      touch={touched.password}
                      error={errors.password}
                      value={false}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Login
                </Button>
                <Grid container justifyContent="flex-end" spacing={1}>
                  <Grid item sx={{ marginTop: "20px" }}>
                    <Link href="/forgot-password" variant="body2">
                      Forgot Password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}
      </div>
    </>
  );
}
