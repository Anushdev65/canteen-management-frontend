import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useGetAllFoodCategoryQuery } from "../../../../services/api/canteen/foodcategory";
import DropZoneComp from "../../../DropZoneComp";
import MUIError from "../../../MUIError";
import FoodItemAutoComplete from "./FoodItemAutoComplete";
import "./fooditem.css";
export const tags = [
  { label: "breakfast" },
  { label: "lunch" },
  { label: "dinner" },
  { label: "snacks" },
  { label: "all time" },
];

export default function FoodItemForm({
  handleBlur,
  touched,
  errors,
  handleChange,
  handleSubmit,
  values,
}) {
  const { data } = useGetAllFoodCategoryQuery();
  const handleCategoryChange = (event, newValue) => {
    handleChange({
      target: {
        name: "category",
        value: newValue?.id,
      },
    });
  };

  const handleTagsChange = (event, newValue) => {
    handleChange({
      target: {
        name: "tags",
        value: newValue?.label,
      },
    });
  };

  const handleImageUpload = React.useCallback((image) => {
    handleChange({
      target: {
        name: "foodImage",
        value: image,
      },
    });
    handleBlur({
      target: {
        name: "foodImage",
      },
    });
  }, []);

  const category = data?.data.results?.map((category) => ({
    label: category.name,
    id: category._id,
  }));

  return (
    <Box
      component={"form"}
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid container mr={"2rem"}>
        <Grid item>
          <Box sx={{ mt: 3 }} name="signinform">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={touched.name && errors.name}
                  autoComplete="off"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Food Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <MUIError
                  touch={touched.name}
                  error={errors.name}
                  value={false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={touched.description && errors.description}
                  autoComplete="off"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <MUIError
                  touch={touched.description}
                  error={errors.description}
                  value={false}
                />
              </Grid>
              {category && (
                <Grid item xs={12}>
                  <FoodItemAutoComplete
                    error={touched.category && errors.category}
                    autoComplete="off"
                    name="category"
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    onChange={handleCategoryChange}
                    onBlur={handleBlur}
                    value={
                      category.find((cat) => cat.id === values.category) || null
                    }
                    options={category}
                  />
                  <MUIError
                    touch={touched.category}
                    error={errors.category}
                    value={false}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FoodItemAutoComplete
                  autoComplete="off"
                  name="tags"
                  required
                  fullWidth
                  id="tags"
                  label="Tags"
                  onChange={handleTagsChange}
                  onBlur={handleBlur}
                  value={values.tags}
                  options={tags}
                />
                <MUIError
                  touch={touched.tags}
                  error={errors.tags}
                  value={false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={touched.rate && errors.rate}
                  autoComplete="off"
                  name="rate"
                  required
                  fullWidth
                  id="rate"
                  label="Rate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rate}
                />
                <MUIError
                  touch={touched.rate}
                  error={errors.rate}
                  value={false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={touched.discountedRate && errors.discountedRate}
                  autoComplete="off"
                  name="discountedRate"
                  required
                  fullWidth
                  id="discountedRate"
                  label="Discounted Rate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.discountedRate}
                />
                <MUIError
                  touch={touched.discountedRate}
                  error={errors.discountedRate}
                  value={false}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Food Item
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container className="dropzone-container">
        <Grid item>
          <DropZoneComp
            error={touched.foodImage && errors.foodImage}
            fullWidth
            id="foodImage"
            name="foodImage"
            autoComplete="off"
            value={values.foodImage}
            onChange={handleChange}
            onBlur={handleBlur}
            handleImageUpload={handleImageUpload}
          />
          <MUIError
            touch={touched.foodImage}
            error={errors.foodImage}
            value={values.foodImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
