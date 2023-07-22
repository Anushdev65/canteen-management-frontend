import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Button, Typography } from "@mui/material";
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
import { fundLoadSchema } from "../../../schema/YupFundLoadSchema";
import { useLoadFundByAdminMutation } from "../../../services/api/admin/auth";
import "../../../styles/muimodal.css";
import MUIError from "../../MUIError";
import MUIToast from "../../MUIToast";
import FundLoad from "../component/FundLoad";

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

export default function DepositModel({ open, handleClose, row }) {
  const [loadFundByAdmin, { data, error, isSuccess }] =
    useLoadFundByAdminMutation();
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
      amount: "",
    },
    validationSchema: fundLoadSchema,
    onSubmit: (values) => {
      const body = {
        amount: parseFloat(values.amount),
      };
      loadFundByAdmin({ body, id: row.original._id });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      handleReset();
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
          Load Fund
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
              <Typography mt={1} mb={2}>
                {`This is fund load for ${row.original.firstName}`}
              </Typography>
              <FundLoad
                label={"FundLoad"}
                onChange={handleChange}
                values={values}
                error={Boolean(touched.amount && errors.amount)}
                autoComplete="off"
                name="amount"
                required
                fullWidth
                id="amount"
                onBlur={handleBlur}
              />
              <MUIError
                touch={touched.amount}
                error={errors.amount}
                value={false}
              />
              <Button
                id="button"
                type="submit"
                variant="contained"
                size="large" // Use "small" size to reduce the button size
                sx={{ mt: 3, mb: 2 }}
              >
                {"Load Fund"}
              </Button>
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
