import * as Yup from "yup";

export const foodCategoryNameSchema = Yup.object({
  name: Yup.string().min(3).required("Food Name Required"),
});
