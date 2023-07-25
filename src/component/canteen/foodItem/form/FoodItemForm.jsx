import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import * as React from "react";
import { useGetAllFoodCategoryQuery } from "../../../../services/api/canteen/foodcategory";
import DropZoneComp from "../../../DropZoneComp";
import MUIError from "../../../MUIError";
import FoodItemAutoComplete from "./FoodItemAutoComplete";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import DiscountIcon from "@mui/icons-material/Discount";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../../../../foodstyles/fooditem.css";
import { TextareaAutosize } from "@mui/material";

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
  updateItem,
}) {
  const { data } = useGetAllFoodCategoryQuery();
  const handleCategoryChange = (event, newValue) => {
    handleChange({
      target: {
        name: "category",
        value: newValue?.id || "",
      },
    });
  };

  const handleTagsChange = (event, newValue) => {
    handleChange({
      target: {
        name: "tags",
        value: newValue?.label || "",
      },
    });
  };

  const handleImageUpload = React.useCallback(
    (image) => {
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
    },
    [handleBlur, handleChange]
  );

  const category = data?.data.results?.map((category) => ({
    label: category.name,
    id: category._id,
  }));

  return (
    <div className="textfild-components">
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid container mr={"2rem"}>
          <Grid item>
            <Box sx={{ mt: 3 }} name="signinform">
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <div className="fastfood">
                    <FastfoodIcon className="Icon" />
                    <div className="text">
                      <TextField
                        error={Boolean(touched.name && errors.name)}
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
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="description">
                    <DescriptionIcon className="Icon" />
                    <div className="text">
                      <TextareaAutosize
                        minRows={5}
                        maxRows={10}
                        multiline
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        autoComplete="off"
                        name="description"
                        fullWidth
                        id="description"
                        label="Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="my-textarea"
                      />
                      <MUIError
                        touch={touched.description}
                        error={errors.description}
                        value={false}
                      />
                    </div>
                  </div>
                </Grid>
                {category && (
                  <Grid item xs={12}>
                    <div className="category">
                      <CategoryIcon className="Icon" />
                      <div className="text">
                        <FoodItemAutoComplete
                          name="category"
                          errors={errors}
                          touched={touched}
                          autoComplete="off"
                          required
                          fullWidth
                          id="category"
                          label="Category"
                          onChange={handleCategoryChange}
                          onBlur={handleBlur}
                          value={
                            category.find(
                              (cat) => cat.id === values.category
                            ) || null
                          }
                          options={category}
                        />
                        <MUIError
                          touch={touched.category}
                          error={errors.category}
                          value={false}
                        />
                      </div>
                    </div>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <div className="tags">
                    <StyleIcon className="Icon" />
                    <div className="text">
                      <FoodItemAutoComplete
                        name="tags"
                        errors={errors}
                        touched={touched}
                        autoComplete="off"
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
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="price">
                    <CurrencyRupeeIcon className="Icon" />
                    <div className="text">
                      <TextField
                        error={Boolean(touched.rate && errors.rate)}
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
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="discount-price">
                    <DiscountIcon className="Icon" />
                    <div className="text">
                      <TextField
                        error={Boolean(
                          touched.discountedRate && errors.discountedRate
                        )}
                        autoComplete="off"
                        name="discountedRate"
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
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
              >
                {updateItem ? "Update Food Item" : "Create Food Item"}
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
    </div>
  );
}
