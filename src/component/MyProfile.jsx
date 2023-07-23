import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailIcon from "@mui/icons-material/Email";
import FemaleIcon from "@mui/icons-material/Female";
import GroupsIcon from "@mui/icons-material/Groups";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMyProfileQuery,
  useLazyGetUserByIdQuery,
} from "../services/api/admin/auth";
import MUIModal from "./MUIModal";
import "../styles/profile.css";
const MyProfile = () => {
  const { id } = useParams();
  const { data: myProfileData } = useGetMyProfileQuery();
  const [trigger, { data: userData }] = useLazyGetUserByIdQuery();
  const [totalBalance, setUserBalance] = useState(null);
  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id, trigger]);

  const data = id ? userData : myProfileData;

  const [openModal, setOpenModal] = useState(false);

  const handleEditProfile = () => {
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const getGenderIcon = () => {
    if (data && data.data.gender === "female") {
      return <FemaleIcon sx={{ position: "relative", bottom: "2px" }} />;
    } else {
      return <MaleIcon sx={{ position: "relative", bottom: "2px" }} />;
    }
  };

  //const userBalance = data?.data.balance;
  useEffect(() => {
    if (data) {
      console.log("userData:", data);
      setUserBalance(data?.data?.totalBalance);
    }
  }, [data]);
  const isAdminOrCanteen =
    data?.data.roles.includes("admin") || data?.data.roles.includes("canteen");
  return (
    <>
      <MUIModal open={openModal} handleClose={handleCloseModal} />

      {data && (
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
                src="/deerwalkCompware.png"
                alt=""
                style={{
                  width: "350px",
                  height: "150px",
                  marginLeft: "190px",
                  marginTop: "20px",
                }}
              ></img>
              <img
                src={`${data?.data.profile}`}
                alt=""
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "100%",
                  marginTop: "-22px",
                  marginRight: "400px",
                }}
              />
            </Container>

            <Typography
              className="myprofile"
              component="h1"
              variant="h5"
              mt={1}
            >
              {data?.data.firstName && data?.data.lastName
                ? `${
                    data.data.firstName.charAt(0).toUpperCase() +
                    data.data.firstName.slice(1)
                  } ${
                    data.data.lastName.charAt(0).toUpperCase() +
                    data.data.lastName.slice(1)
                  }`
                : "My profile"}
            </Typography>

            <Button
              className="button-btn"
              variant="contained"
              onClick={handleEditProfile}
            >
              <EditOutlinedIcon />
              Edit Profile
            </Button>

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
                    marginRight: "15px",
                    height: "130px",
                    textAlign: "left",
                    // marginTop: "0.5px",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                      }}
                    >
                      <PersonIcon
                        sx={{ position: "relative", bottom: "2px" }}
                      />
                      {data.data.firstName.charAt(0).toUpperCase() +
                        data.data.firstName.slice(1)}{" "}
                      {data.data.lastName.charAt(0).toUpperCase() +
                        data.data.lastName.slice(1)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                      }}
                    >
                      <EmailIcon sx={{ position: "relative", bottom: "2px" }} />
                      {data.data.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                      }}
                    >
                      <PhoneIcon sx={{ position: "relative", bottom: "2px" }} />
                      {data.data.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      {getGenderIcon()}
                      {data.data.gender.charAt(0).toUpperCase() +
                        data.data.gender.slice(1)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                      }}
                    >
                      <GroupsIcon
                        sx={{ position: "relative", bottom: "2px" }}
                      />
                      {data.data.roles
                        .map(
                          (role) =>
                            role.charAt(0).toUpperCase() +
                            role.slice(1).toLowerCase()
                        )
                        .join(",")}
                    </Typography>
                  </Grid>
                  {!isAdminOrCanteen && totalBalance !== null && (
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          display: "flex",
                          gap: "10px",
                          flexDirection: "row",
                        }}
                      >
                        <CurrencyRupeeIcon /> Your Balance:
                        {totalBalance}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default MyProfile;
