import * as Yup from "yup";

export const foodCategoryNameSchema = Yup.object({
  name: Yup.string()
    .required("Food Name Required")
    .test(
      "categoryName-validation",
      "Category names must begin with a small letter and have a minimum of three characters.",
      function (value) {
        return /^[a-z]{3,30}$/.test(value);
      }
    ),
});
