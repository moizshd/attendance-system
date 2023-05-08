// components/CustomAppBar.js
import React from "react";
import { AppBar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CustomAppBar = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#1e1e1e",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" color="white">
            Facial Recognition System
          </Typography>
        </Link>
        <Box>
          <Button
            component={Link}
            to="/register"
            variant="text"
            size="large"
            color="inherit"
            sx={{
              marginRight: ".7rem",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/attendance"
            variant="text"
            size="large"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Attendance
          </Button>
          <Button
            component={Link}
            to="/view-attendance"
            variant="text"
            size="large"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            View Attendance
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default CustomAppBar;
