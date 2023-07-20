import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useEffect } from "react";
import { foodCategoryNameSchema } from "../../../../schema/YupCanteenSchema";
import {
  useCreateFoodCategoryMutation,
  useUpdateFoodCategoryMutation,
} from "../../../../services/api/canteen/foodcategory";
import MUIToast from "../../../MUIToast";
import AddCategory from "../form/AddCategory";

export default function AddCategoryModel({ open, handleClose, category }) {
  const [
    createFoodCategory,
    { data: createFood, error: createError, isSuccess: createSuccess },
  ] = useCreateFoodCategoryMutation();
  const [
    updateFoodCategory,
    { data: updateFood, error: updateError, isSuccess: updateSuccess },
  ] = useUpdateFoodCategoryMutation();

  const data = createFood || updateFood;
  const error = createError || updateError;
  const isSuccess = createSuccess || updateSuccess;

  const {
    handleBlur,
    touched,
    errors,
    handleChange,
    handleSubmit,
    values,
    handleReset,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: { name: category?.name || "" },
    validationSchema: foodCategoryNameSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
      };
      category
        ? updateFoodCategory({ body, id: category._id })
        : createFoodCategory(body);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      handleClose();
      handleReset();
    }
  }, [resetForm, handleClose, handleReset, isSuccess]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleReset();
          handleClose();
        }}
      >
        <DialogTitle textAlign={"center"}>Add Food Category</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "10px" }}>
            Please specify the food category so that it can be featured to this
            system.
          </DialogContentText>
          <AddCategory
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            values={values}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            {category ? "Update Category" : "Add Category"}
          </Button>
        </DialogActions>
      </Dialog>
      {data ? (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      ) : error ? (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
