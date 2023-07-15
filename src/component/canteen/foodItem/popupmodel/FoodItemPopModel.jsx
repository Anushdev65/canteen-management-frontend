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
import React, { useEffect, useState } from "react";
import { foodItemSchema } from "../../../../schema/YupCanteenSchema";
import {
  useLazyGetFoodItemByIdQuery,
  useUpdateFoodItemMutation,
} from "../../../../services/api/canteen/foodItem";
import "../../../../styles/muimodal.css";
import MUIToast from "../../../MUIToast";
import FoodItemForm from "../form/FoodItemForm";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const diologContentElement = document.querySelector(".custom-dialog");
      if (diologContentElement) {
        setIsScrolled(diologContentElement.scrollTop > 0);
      }
    };
    const diologContentElement = document.querySelector(".custom-dialog");
    if (diologContentElement) {
      diologContentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (diologContentElement) {
        diologContentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <DialogTitle
      className={`dialogTitle ${isScrolled ? "scrolled" : ""}`}
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

export default function FoodItemPopModel({ open, handleClose, foodId }) {
  const [trigger, { data: foodInfo }] = useLazyGetFoodItemByIdQuery();
  const [updateFoodItem, { data, error }] = useUpdateFoodItemMutation();

  useEffect(() => {
    if (foodId) {
      trigger(foodId);
    }
  }, [foodId, trigger]);

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
      name: foodInfo?.data?.name || "",
      description: foodInfo?.data?.description || "",
      category: foodInfo?.data?.category?._id || "",
      tags: foodInfo?.data?.tags[0] || "",
      rate: foodInfo?.data?.rate || "",
      discountedRate: foodInfo?.data?.discountedRate || "",
      foodImage: foodInfo?.data?.foodImage || "",
    },
    validationSchema: foodItemSchema,
    onSubmit: (values, action) => {
      const body = {
        name: values.name,
        description: values.description,
        category: values.category,
        tags: values.tags,
        rate: values.rate,
        discountedRate: values.discountedRate,
        foodImage: values.foodImage,
      };
      updateFoodItem({ body, id: foodId });
      action.resetForm();
      handleClose();
    },
  });

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
          Update FoodItem
        </BootstrapDialogTitle>
        <DialogContent dividers className="custom-dialog">
          <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FoodItemForm
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                values={values}
                updateItem={true}
              />
            </Box>
          </Container>
        </DialogContent>
      </BootstrapDialog>
      {data && (
        <MUIToast
          initialValue={true}
          message={data.message}
          severity="success"
        />
      )}{" "}
      {error && (
        <MUIToast
          initialValue={true}
          message={error.data.message}
          severity="error"
        />
      )}
    </div>
  );
}
