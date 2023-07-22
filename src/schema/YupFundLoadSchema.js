import * as Yup from "yup";

const numberRegex = /^[0-9]*$/;

export const fundLoadSchema = Yup.object({
  amount: Yup.string()
    .required("Amount to be deposited required.")
    .test("amount-validation", "Amount must be number.", function (value) {
      return numberRegex.test(value);
    }),
});
