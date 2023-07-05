import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SigninForm from "./SigninForm";
import { userUpdateProfileSchema } from "../schema/YupSchema";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../services/api/admin/auth";
import MUIToast from "./MUIToast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...other}
    >
      <ManageAccountsOutlinedIcon sx={{ mr: 2 }} />
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MUIModal({ open, handleClose }) {
  const { data: userInfo } = useGetMyProfileQuery();
  const [updateProfile, { data, error }] = useUpdateProfileMutation();

  const { handleBlur, touched, errors, handleChange, handleSubmit, values } =
    useFormik({
      initialValues: {
        firstName: userInfo?.data?.firstName || "",
        lastName: userInfo?.data?.lastName || "",
        role: userInfo?.data?.roles?.length ? userInfo?.data?.roles : [],
        phoneNumber: userInfo?.data?.phoneNumber || "",
        gender: userInfo?.data?.gender || "",
        userImage: userInfo?.data?.profile || "",
      },
      validationSchema: userUpdateProfileSchema,
      onSubmit: (values, action) => {
        const body = {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          roles: values.role,
          profile: values.userImage,
        };
        updateProfile(body);
        console.log(body);
        action.resetForm();
        handleClose();
      },
      enableReinitialize: true,
    });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Update Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      defaultValue="John"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      defaultValue="Cena"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                      defaultValue="1231231233"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MUIMultiSelect error={""} defaultValue={["Admin"]} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="gender"
                      label="Gender"
                      type="gender"
                      id="gender"
                      autoComplete="new-gender"
                    />
                  </Grid>
                </Grid>
              </Box> */}
              <SigninForm
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                updateProfile={true}
              />
            </Box>
          </Container>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>

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
