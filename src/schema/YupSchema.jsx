import * as Yup from "yup";

export const userRegistrationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      }
    ),
  firstName: Yup.string().required("First Name required."),
  lastName: Yup.string().required("Last Name required."),
  userImage: Yup.string().required("Upload Picture"),
  role: Yup.array()
    .min(1, "Select at least one user type")
    .required("Select user type"),
  phoneNumber: Yup.string().length(10).required("Phone number required."),
  gender: Yup.string().required("Gender required."),
});

export const userPasswordSchema = Yup.object({
  password: Yup.string().min(6).max(15).required("Password required."),
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password mis-match."
    ),
});

export const userLoginSchema = Yup.object({
  password: Yup.string().required("Password required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      }
    ),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      }
    ),
  confirmEmail: Yup.string()
    .email("Please enter a valid email address.")
    .required("Confirm Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      }
    )
    .oneOf([Yup.ref("email"), null], "Email and Confirm Email mis-match."),
});

export const userResetPasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .notOneOf([Yup.ref("password")], "Old and new password must be different.")
    .required("Password required."),
  password: Yup.string().min(6).max(15).required("Password required."),
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password mis-match."
    ),
});

export const userUpdateProfileSchema = Yup.object({
  firstName: Yup.string().required("First Name required."),
  lastName: Yup.string().required("Last Name required."),
  role: Yup.array()
    .min(1, "Select at least one user type")
    .required("Select user type"),
  phoneNumber: Yup.string().length(10).required("Phone number required."),
  gender: Yup.string().required("Gender required."),
  userImage: Yup.string().required("Upload Picture"),
});
