import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button, DialogActions, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { useDeleteUserByAdminMutation } from "../services/api/admin/auth";
import MUIToast from "./MUIToast";
import { useDeleteFoodCategoryMutation } from "../services/api/canteen/foodcategory";
import { useDeleteFoodItemMutation } from "../services/api/canteen/foodItem";

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
      <DeleteOutlinedIcon sx={{ mr: 2 }} />
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

export default function MUIDeleteModal({
  open,
  handleClose,
  userId,
  category,
  foodItem,
}) {
  const [deleteUserByAdmin, { data: userData, error: userError }] =
    useDeleteUserByAdminMutation();
  const [deleteFoodCategory, { data: categoryData, error: categoryError }] =
    useDeleteFoodCategoryMutation();
  const [deleteFoodItem, { data: foodItemData, error: foodItemError }] =
    useDeleteFoodItemMutation();

  const data = userData || categoryData || foodItemData;
  const error = userError || categoryError || foodItemError;

  const handleAgree = () => {
    if (userId) {
      deleteUserByAdmin(userId);
    } else if (category?._id) {
      deleteFoodCategory(category._id);
    } else if (foodItem?._id) {
      deleteFoodItem(foodItem._id);
    }

    handleClose();
  };

  const handleDisagree = () => {
    handleClose();
  };

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
          {userId
            ? "Delete Profile"
            : category
            ? "Delete Food Category"
            : "Delete Food Item"}
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
              <Typography>
                {foodItem
                  ? `Are You sure you want to delete ${foodItem?.name} item?`
                  : category
                  ? `Are You sure you want to delete ${category?.name} category?`
                  : "Are You sure you want to delete this user?"}
              </Typography>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
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
