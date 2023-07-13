import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DropZoneComp from "../../../DropZoneComp";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";

const AddFoodItem = () => {
  const handleImageUpload = (image) => {};

  return (
    <>
      <h1>Add Food Items</h1>
      <Container sx={{ border: "1px solid grey", width: 800 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="rate"
                    label="Rate"
                    name="rate"
                    autoComplete="Rate"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="discountedRate"
                    label="Discounted Rate"
                    name="discountedRate"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    name="category"
                    autoComplete="on"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="tags"
                    label="Tags"
                    name="tags"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={8} sx={{ mr: 20 }}>
            <DropZoneComp
              required
              fullWidth
              id="foodImage"
              name="foodImage"
              autoComplete="off"
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </Box>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, ml: 15 }}>
          Submit
        </Button>
      </Container>
    </>
  );
};

export default AddFoodItem;
