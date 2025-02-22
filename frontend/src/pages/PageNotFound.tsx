import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
      padding={3}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" marginBottom={2}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" marginBottom={4}>
        Sorry, the page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoToLogin}>
        Go to Login
      </Button>
    </Box>
  );
};

export default PageNotFound;