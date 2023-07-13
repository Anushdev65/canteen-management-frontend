import * as Yup from "yup";

const categoryNameRegex = /^[a-z]{3,30}$/;
const numberRegex = /^[0-9]*$/;
const descriptionRegex = /^[A-Za-z]+$/;

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

export const foodItemSchema = Yup.object({
  name: Yup.string()
    .required("Food Name Required")
    .test(
      "foodItemName-validation",
      "Item names must begin with a small letter and have a minimum of three characters.",
      function (value) {
        return categoryNameRegex.test(value);
      }
    ),
  rate: Yup.string()
    .required("Rate required")
    .test("rate-validation", "Rate is digit only.", function (value) {
      return numberRegex.test(value);
    }),
  discountedRate: Yup.string()
    .required("Rate required")
    .test("discountedRate-validation", "Rate is digit only.", function (value) {
      return numberRegex.test(value);
    }),
  category: Yup.string.required("Category required"),
  description: Yup.string
    .required("Description required")
    .test("description-validation", "Alphabets only.", function (value) {
      return descriptionRegex.test(value);
    }),
  tags: Yup.string.required("Category required"),
  foodImage: Yup.string.required("Category required"),
});
