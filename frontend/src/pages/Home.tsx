import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradeAvg from "../components/GradeAvg";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
    


  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h3" gutterBottom>
            Welcome to Grade Tracker
            </Typography>
            <Typography variant="h5" gutterBottom mb={5}>
            📚 Track your university grade average
            </Typography>
            <Typography variant="body1" gutterBottom mb={2}>
            Get Started
            </Typography>
            <Box display="flex" justifyContent="space-between" width="100%">
            <Button 
                type="button" 
                fullWidth 
                variant="contained" 
                color="primary" 
                sx={{ flex: 1 , mr: 1}}
                onClick={() => navigate("/register")}
                >
                REGISTER
            </Button>
            <Button 
                type="button" 
                fullWidth 
                variant="contained" 
                color="primary" 
                sx={{ flex: 1 }}
                onClick={() => navigate("/login")}
                >
                LOGIN
            </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} alignContent={"center"} padding={5}>
          <GradeAvg />
        </Grid>
      </Grid>

    </Box>
  );
};

export default HomePage;
