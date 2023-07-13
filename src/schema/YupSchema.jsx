import * as Yup from "yup";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const nameRegex = /^[a-zA-Z]*$/;
const phoneNumberRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/;

export const userRegistrationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return emailRegex.test(value);
      }
    ),
  firstName: Yup.string()
    .required("First Name required.")
    .test("firstName-validation", "Name must be alphabet.", function (value) {
      return nameRegex.test(value);
    }),
  lastName: Yup.string()
    .required("Last Name required.")
    .test(
      "lastName-validation",
      "Last name must be alphabet.",
      function (value) {
        return nameRegex.test(value);
      }
    ),
  userImage: Yup.string(),
  role: Yup.array()
    .min(1, "Select at least one user type")
    .required("Select user type"),
  phoneNumber: Yup.string()
    .length(10)
    .required("Phone number required.")
    .test(
      "phoneNumber-validation",
      "Only digits may be used in the phone number, and it must begin with 97 or 98.",
      function (value) {
        return phoneNumberRegex.test(value);
      }
    ),
  gender: Yup.string().required("Gender required."),
});

export const userPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8)
    .required("Password required.")
    .test(
      "password-validation",
      "Password must be minimum of eight characters, with no space , at least one uppercase letter, one lowercase letter, one number and one special character.",
      function (value) {
        return passwordRegex.test(value);
      }
    ),
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
        return emailRegex.test(value);
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
        return emailRegex.test(value);
      }
    ),
  confirmEmail: Yup.string()
    .email("Please enter a valid email address.")
    .required("Confirm Email required.")
    .test(
      "email-validation",
      "Please enter a valid email address.",
      function (value) {
        return emailRegex.test(value);
      }
    )
    .oneOf([Yup.ref("email"), null], "Email and Confirm Email mis-match."),
});

export const userResetPasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .notOneOf([Yup.ref("password")], "Old and new password must be different.")
    .required("Password required."),
  password: Yup.string()
    .min(8)
    .required("Password required.")
    .test(
      "password-validation",
      "Password must be minimum of eight characters, with no space , at least one uppercase letter, one lowercase letter, one number and one special character.",
      function (value) {
        return passwordRegex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password mis-match."
    ),
});

export const userUpdateProfileSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name required.")
    .test("firstName-validation", "Name must be alphabet.", function (value) {
      return nameRegex.test(value);
    }),
  lastName: Yup.string()
    .required("Last Name required.")
    .test(
      "lastName-validation",
      "Last name must be alphabet.",
      function (value) {
        return nameRegex.test(value);
      }
    ),
  role: Yup.array()
    .min(1, "Select at least one user type")
    .required("Select user type"),
  phoneNumber: Yup.string()
    .length(10)
    .required("Phone number required.")
    .test(
      "phoneNumber-validation",
      "Only digits may be used in the phone number, and it must begin with 97 or 98.",
      function (value) {
        return phoneNumberRegex.test(value);
      }
    ),
  gender: Yup.string().required("Gender required."),
  userImage: Yup.string(),
});
