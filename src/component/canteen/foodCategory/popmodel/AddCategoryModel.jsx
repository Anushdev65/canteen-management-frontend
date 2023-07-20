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
    if (createSuccess || updateSuccess) {
      resetForm();
      handleReset();
      handleClose();
    }
  }, [resetForm, handleReset, createSuccess, updateSuccess, handleClose]);

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
          <DialogContentText
            sx={{ marginBottom: "10px" }}
            className="text-category"
          >
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
      {createSuccess && (
        <MUIToast
          initialValue={true}
          message={createFood?.message}
          severity="success"
        />
      )}
      {updateSuccess && (
        <MUIToast
          initialValue={true}
          message={updateFood?.message}
          severity="success"
        />
      )}
      {createError && (
        <MUIToast
          initialValue={true}
          message={createError.data.message}
          severity="error"
        />
      )}
      {updateError && (
        <MUIToast
          initialValue={true}
          message={updateError.data.message}
          severity="error"
        />
      )}
    </div>
  );
}
