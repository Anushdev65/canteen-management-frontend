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
  // password: Yup.string().min(6).max(15).required("Password required."),
  firstName: Yup.string().required("First Name required."),
  lastName: Yup.string().required("Last Name required."),
  userImage: Yup.string().required("Upload Picture"),
  // confirmPassword: Yup.string()
  //   .required("Confirm Password Required")
  //   .oneOf(
  //     [Yup.ref("password"), null],
  //     "Password and Confirm Password mis-match."
  //   ),
  userType: Yup.array()
    .min(1, "Select at least one user type")
    .required("Select user type"),
});
