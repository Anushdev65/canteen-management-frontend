import { useFormik } from "formik";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MUILoading from "../component/MUILoading";
import MUIToast from "../component/MUIToast";
import PasswordForm from "../component/PasswordForm";
import { removeLevelInfo, setLevelInfo } from "../localStorage/localStorage";
import { userPasswordSchema } from "../schema/YupSchema";
import { useVerifyUserMutation } from "../services/api/admin/auth";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ConfirmPassword() {
  const [verifyUser, { isLoading, data, error, isSuccess }] =
    useVerifyUserMutation();
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

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
    validationSchema: userPasswordSchema,
    onSubmit: (values) => {
      verifyUser({ password: values.password });
    },
  });

  React.useEffect(() => {
    setLevelInfo({
      token: searchparams.get("token"),
    });
  }, [searchparams]);

  React.useEffect(() => {
    if (isSuccess) {
      resetForm();
      removeLevelInfo();
    }
    if (data) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [data, navigate, isSuccess, resetForm]);

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
