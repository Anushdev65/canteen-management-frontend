import * as Yup from "yup";

const categoryNameRegex = /^[a-z]{3,30}( [a-z]{3,30}){0,2}$/;
const numberRegex = /^[0-9]*$/;

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
    .min(3)
    .test(
      "foodItemName-validation",
      "Item names must have a minimum of three characters.",
      function (value) {
        return categoryNameRegex.test(value);
      }
    ),
  rate: Yup.string()
    .required("Rate required")
    .test("rate-validation", "Rate is digit only.", function (value) {
      return numberRegex.test(value);
    }),
  discountedRate: Yup.string().test(
    "discountedRate-validation",
    "Rate must be less than or equal to the rate.",
    function (value) {
      const { rate } = this.parent;
      if (value && value.trim() !== "") {
        return numberRegex.test(value) && parseFloat(value) <= parseFloat(rate);
      }
      return true;
    }
  ),
  category: Yup.string().required("Category required"),
  description: Yup.string(),
  tags: Yup.string().required("Tags required"),
  foodImage: Yup.string().required("Image required"),
});

export const incrementItemSchema = Yup.object({
  quantity: Yup.string()
    .required("Increment amount required.")
    .test(
      "increment-validation",
      "Quantity must be greater than zero.",
      function (value) {
        return numberRegex.test(value) && parseInt(value) > 0;
      }
    ),
});
