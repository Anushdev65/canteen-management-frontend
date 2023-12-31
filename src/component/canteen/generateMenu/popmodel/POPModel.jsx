import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Button } from "@mui/material";
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
import { incrementItemSchema } from "../../../../schema/YupCanteenSchema";
import { useAddFoodAmountMutation } from "../../../../services/api/canteen/foodItem";
import "../../../../styles/muimodal.css";
import MUIError from "../../../MUIError";
import AddQuantity from "../component/AddQuantity";
import MUIToast from "../../../MUIToast";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function POPModel({ open, handleClose, row }) {
  const [addFoodAmount, { data, error, isSuccess, isLoading }] =
    useAddFoodAmountMutation();
  const {
    touched,
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: incrementItemSchema,
    onSubmit: (values) => {
      const body = {
        quantity: parseFloat(values.quantity),
      };
      addFoodAmount({ body, id: row.original._id });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        handleReset();
        window.location.href = "/generate-menu";
      }, 3000);
    }
  }, [handleReset, isSuccess, handleClose]);

  return (
    <div>
      <BootstrapDialog
        onClose={() => {
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
          Add Quantity
        </BootstrapDialogTitle>
        <DialogContent dividers className="custom-dialog">
          <Container component="main" maxWidth="sm" sx={{ mb: 2 }}>
            <CssBaseline />

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isLoading || data ? (
                <Box
                  sx={{
                    marginTop: "45px",
                    marginBottom: "45px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <AddQuantity
                    label={"IncrementAmount"}
                    onChange={handleChange}
                    values={values}
                    error={Boolean(touched.quantity && errors.quantity)}
                    autoComplete="off"
                    name="quantity"
                    required
                    fullWidth
                    id="quantity"
                    onBlur={handleBlur}
                  />
                  <MUIError
                    touch={touched.quantity}
                    error={errors.quantity}
                    value={false}
                  />

                  <Button
                    id="button"
                    type="submit"
                    variant="contained"
                    size="large" // Use "small" size to reduce the button size
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {"Add Quantity"}
                  </Button>
                </>
              )}
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
      )}
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
