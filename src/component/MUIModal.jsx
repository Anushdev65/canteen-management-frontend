import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userUpdateProfileSchema } from "../schema/YupSchema";
import {
  useGetMyProfileQuery,
  useLazyGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateUserByAdminMutation,
} from "../services/api/admin/auth";
import MUIToast from "./MUIToast";
import SigninForm from "./SigninForm";

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

export default function MUIModal({ open, handleClose, userId }) {
  const { id: idParam } = useParams();
  const { data: adminInfo } = useGetMyProfileQuery();
  // const { data: userData } = useGetUserByIdQuery(id);
  // const { data: userDataTable } = useGetUserByIdQuery(userId);
  const [trigger, { data: userData }] = useLazyGetUserByIdQuery();
  const id = idParam || userId;

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [trigger, id]);

  const userInfo = id ? userData : adminInfo;
  const [updateProfile, { data: adminUpdate, error: adminError }] =
    useUpdateProfileMutation();
  const [updateUserByAdmin, { data: userUpdate, error: userUpdateError }] =
    useUpdateUserByAdminMutation();

  const data = adminUpdate || userUpdate;
  const error = adminError || userUpdateError;

  const {
    handleBlur,
    touched,
    errors,
    handleChange,
    handleSubmit,
    values,
    handleReset,
  } = useFormik({
    enableReinitialize: true,
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
        phoneNumber: `${values.phoneNumber}`,
        roles: values.role,
        profile: values.userImage,
      };

      id ? updateUserByAdmin({ body, id }) : updateProfile(body);
      console.log(body.profile);
      action.resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <div>
      <BootstrapDialog
        onClose={() => {
          values.userImage = "";
          handleReset();
          handleClose();
        }}
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
          onClose={() => {
            handleReset();
            handleClose();
          }}
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
              <SigninForm
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                updateProfile={true}
                user={userInfo?.data}
              />
            </Box>
          </Container>
        </DialogContent>
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
