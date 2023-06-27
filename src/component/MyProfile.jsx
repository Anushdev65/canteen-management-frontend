import React from "react";
import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { useGetMyProfileQuery } from "../services/api/admin/auth";

const MyProfile = () => {
  const { data } = useGetMyProfileQuery();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <img
          src="smile.png"
          alt="Profile Picture"
          style={{
            height: "80px",
            width: "80px",
            marginRight: "16px",
            borderRadius: "100%",
          }}
        />

        <Typography component="h1" variant="h5" mt={2}>
          Myprofile
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  {data.data.firstName} {data.data.lastName}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>{data.data.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{data.data.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{data.data.gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{data.data.roles}</Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MyProfile;
