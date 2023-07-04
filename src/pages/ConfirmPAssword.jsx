import * as React from "react";
import { useFormik } from "formik";
import { userPasswordSchema } from "../schema/YupSchema";
import { useVerifyUserMutation } from "../services/api/admin/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeLevelInfo, setLevelInfo } from "../localStorage/localStorage";
import MUILoading from "../component/MUILoading";
import MUIToast from "../component/MUIToast";
import PasswordForm from "../component/PasswordForm";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ConfirmPassword() {
  const [verifyUser, { isLoading, data, error }] = useVerifyUserMutation();
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

  const { handleBlur, touched, errors, handleChange, handleSubmit, values } =
    useFormik({
      initialValues,
      validationSchema: userPasswordSchema,
      onSubmit: (values, action) => {
        verifyUser({ password: values.password });
        action.resetForm();
        // removeLevelInfo();
      },
    });

  React.useEffect(() => {
    setLevelInfo({
      token: searchparams.get("token"),
    });
  }, [searchparams, setLevelInfo]);

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
      {isLoading || data ? (
        <MUILoading />
      ) : (
        <PasswordForm
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      )}
    </>
  );
}
