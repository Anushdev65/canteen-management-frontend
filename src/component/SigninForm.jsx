import MUIMultiSelect from "../component/MUIMultiSelect";
import MUIError from "../component/MUIError";
import MUIRadioGroup from "../component/MUIRadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DropZoneComp from "../component/DropZoneComp";
import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";

const SigninForm = ({
  handleBlur,
  touched,
  errors,
  handleChange,
  handleSubmit,
  values,
}) => {
  const handleImageUpload = (image) => {
    handleChange({
      target: {
        name: "userImage",
        value: image,
      },
    });
    handleBlur({
      target: {
        name: "userImage",
      },
    });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={touched.firstName && errors.firstName}
            autoComplete="off"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError
            touch={touched.firstName}
            error={errors.firstName}
            value={false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={touched.lastName && errors.lastName}
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="Last name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError
            touch={touched.lastName}
            error={errors.lastName}
            value={false}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={touched.email && errors.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError touch={touched.email} error={errors.email} value={false} />
        </Grid>
        <Grid item xs={12}>
          <MUIMultiSelect
            error={touched.role && errors.role}
            required
            fullWidth
            id="role"
            label="User Type"
            name="role"
            autoComplete="off"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError touch={touched.role} error={errors.role} value={false} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={touched.phoneNumber && errors.phoneNumber}
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="off"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError
            touch={touched.phoneNumber}
            error={errors.phoneNumber}
            value={false}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIRadioGroup
            error={touched.gender && errors.gender}
            required
            fullWidth
            id="gender"
            label="Gender"
            name="gender"
            autoComplete="off"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MUIError
            touch={touched.gender}
            error={errors.gender}
            value={false}
          />
        </Grid>
        <Grid item xs={12}>
          <DropZoneComp
            error={touched.userImage && errors.userImage}
            required
            fullWidth
            id="userImage"
            name="userImage"
            autoComplete="off"
            value={values.userImage}
            onChange={handleChange}
            onBlur={handleBlur}
            handleImageUpload={handleImageUpload}
          />
          <MUIError
            touch={touched.userImage}
            error={errors.userImage}
            value={values.userImage}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      {/* <Grid container justifyContent="flex-end" spacing={1}>
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an aacount? Sign in?
          </Link>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default SigninForm;
