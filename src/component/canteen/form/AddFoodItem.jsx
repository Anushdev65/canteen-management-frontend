import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DropZoneComp from "../../DropZoneComp";
import Box from "@mui/material/Box";

const AddFoodItem = () => {
  const handleImageUpload = (image) => {};

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="off"
            name="name"
            required
            fullWidth
            id="name"
            label="Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="rate"
            label="Rate"
            name="rate"
            autoComplete="Rate"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="discountedRate"
            label="Discounted Rate"
            name="discountedRate"
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="tags"
            label="Tags"
            name="tags"
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <Checkbox
            required
            fullWidth
            id="isInMenu"
            label="isInMenu"
            name="isInMenu"
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={12}>
          <DropZoneComp
            required
            fullWidth
            id="foodImage"
            name="foodImage"
            autoComplete="off"
            handleImageUpload={handleImageUpload}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      ></Button>
    </Box>
  );
};

export default AddFoodItem;
