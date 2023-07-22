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
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import AddQuantity from "../component/AddQuantity";
import "../../../../styles/muimodal.css";
import { Button } from "@mui/material";

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

export default function POPModel({
  open,
  handleClose,
  onChange,
  setValue,
  value,
  row,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked", value, row);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={() => {
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
              <AddQuantity
                label={"AddQuantity"}
                onChange={onChange}
                value={value}
                setValue={setValue}
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
            </Box>
          </Container>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
