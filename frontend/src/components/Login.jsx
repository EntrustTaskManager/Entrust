import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const { student, teacher } = require("../../../backend/server/dummyData/seed");

const Login = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    //👇🏻 saves the username to localstorage

    localStorage.setItem("userId", username);

    setUsername("");

    //👇🏻 redirects to the Tasks page.

    navigate("/task");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "900px",
        height: "60%",
        maxHeight: "500px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: "50%",
          backgroundImage:
            'url("https://www.workbc.ca/sites/default/files/styles/hero_image/public/NTI5NzE_LBEINmT84cG0Guu4-4031-NOC.jpg?itok=i57EEbVr")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Login Form Section */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to Entrust.
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
