import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailIcon from "@mui/icons-material/Email";
import FemaleIcon from "@mui/icons-material/Female";
import GroupsIcon from "@mui/icons-material/Groups";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMyProfileQuery,
  useGetUserByIdQuery,
} from "../services/api/admin/auth";
import MUIModal from "./MUIModal";

const MyProfile = () => {
  const { id } = useParams();
  const { data: myProfileData } = useGetMyProfileQuery();
  const { data: userData } = useGetUserByIdQuery(id);

  const data = id ? userData : myProfileData;

  const [openModal, setOpenModal] = useState(false);

  const handleEditProfile = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getGenderIcon = () => {
    if (data && data.data.gender === "female") {
      return <FemaleIcon sx={{ position: "relative", bottom: "2px" }} />;
    } else {
      return <MaleIcon sx={{ position: "relative", bottom: "2px" }} />;
    }
  };

  return (
    <>
      <MUIModal open={openModal} handleClose={handleCloseModal} />
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Container
            style={{
              backgroundColor: "rgb(231, 229, 229)",
              borderTopLeftRadius: "50px",
              width: "850px",
              height: "180px",
            }}
          >
            <img
              src={`http://localhost:8000/deerwalkCompware.png`}
              alt=""
              style={{
                width: "350px",
                height: "150px",
                marginLeft: "190px",
                marginTop: "20px",
              }}
            ></img>
            <img
              src={`http://${data?.data.profile}`}
              alt=""
              style={{
                height: "80px",
                width: "80px",
                marginRight: "16px",
                borderRadius: "100%",
                marginTop: "-22px",
                marginRight: "400px",
              }}
            />
          </Container>

          <Typography
            component="h1"
            variant="h5"
            mt={1}
            style={{
              textAlign: "left",
              marginLeft: "135px",
            }}
          >
            Myprofile
            <Button
              variant="contained"
              sx={{
                marginLeft: "460px",
              }}
              onClick={handleEditProfile}
            >
              <EditOutlinedIcon />
              Edit Profile
            </Button>
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {data && (
              <Grid
                container
                spacing={2}
                style={{
                  marginRight: "50px",
                  height: "160px",
                  textAlign: "left",
                  marginTop: "0.5px",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{ display: "flex", gap: "10px", flexDirection: "row" }}
                  >
                    <PersonIcon sx={{ position: "relative", bottom: "2px" }} />
                    {data.data.firstName} {data.data.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{ display: "flex", gap: "10px", flexDirection: "row" }}
                  >
                    <EmailIcon sx={{ position: "relative", bottom: "2px" }} />
                    {data.data.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ display: "flex", gap: "10px", flexDirection: "row" }}
                  >
                    <PhoneIcon sx={{ position: "relative", bottom: "2px" }} />
                    {data.data.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ display: "flex", gap: "10px", flexDirection: "row" }}
                  >
                    {" "}
                    {getGenderIcon()}
                    {data.data.gender.charAt(0).toUpperCase() +
                      data.data.gender.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{ display: "flex", gap: "10px", flexDirection: "row" }}
                  >
                    <GroupsIcon sx={{ position: "relative", bottom: "2px" }} />
                    {data.data.roles.map((role) =>
                      role.toLowerCase() === "admin"
                        ? role.charAt(0).toUpperCase() + role.slice(1)
                        : role
                    )}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MyProfile;
