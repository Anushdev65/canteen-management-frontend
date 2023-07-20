import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { userRegistrationSchema } from "../schema/YupSchema";
import { useRegisterUserMutation } from "../services/api/admin/auth";
import MUILoading from "../component/MUILoading";
import MUIToast from "../component/MUIToast";
import SignInLogo from "../component/SignInLogo";
import SigninForm from "../component/SigninForm";
import { useEffect } from "react";

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
  const [registerUser, { isLoading, data, error, isSuccess }] =
    useRegisterUserMutation();
  const {
    handleBlur,
    touched,
    errors,
    handleChange,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: userRegistrationSchema,
    onSubmit: (values) => {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        roles: values.role,
        profile: values.userImage || "localhost:8000/defaultProfile.png",
      };
      registerUser(body);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess, resetForm]);

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
            <SignInLogo />
            <SigninForm
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
            />
          </Box>
        </Container>
      )}
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
    </>
  );
}
