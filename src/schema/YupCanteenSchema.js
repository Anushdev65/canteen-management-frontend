import * as Yup from "yup";

const categoryNameRegex = /^[a-z]{3,30}$/;

export const foodCategoryNameSchema = Yup.object({
  name: Yup.string()
    .required("Food Name Required")
    .test(
      "categoryName-validation",
      "Category names must begin with a small letter and have a minimum of three characters.",
      function (value) {
        return categoryNameRegex.test(value);
      }
    ),
});
