import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { foodItemSchema } from "../../../../schema/YupCanteenSchema";
import { useCreateFoodItemMutation } from "../../../../services/api/canteen/foodItem";
import MUIToast from "../../../MUIToast";
import FoodItemForm from "../form/FoodItemForm";

const defaultTheme = createTheme();

export default function CreateFoodItem() {
  const [createFoodItem, { data, error, isSuccess }] =
    useCreateFoodItemMutation();
  const {
    handleBlur,
    touched,
    errors,
    handleChange,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      rate: "",
      discountedRate: "",
      foodImage: "",
    },
    validationSchema: foodItemSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        description: values.description,
        category: values.category,
        tags: values.tags,
        rate: values.rate,
        discountedRate: values.discountedRate,
        foodImage: values.foodImage,
      };
      createFoodItem(body);
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [resetForm, isSuccess]);
  return (
    <React.Fragment>
      <Box>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LunchDiningOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Food Item
              </Typography>
              <FoodItemForm
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
              />
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
      {data && (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      )}
      {error && (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      )}
    </React.Fragment>
  );
}
