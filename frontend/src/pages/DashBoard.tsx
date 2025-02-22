import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, MenuItem, Divider, Card, Grid } from "@mui/material";
import { Navbar } from "../components/NavBar";
import GradeAvg from "../components/GradeAvg";


export const DashBoard = () =>{

    return (
        <Box sx={{ width: "100%", padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
              <Box display="flex" justifyContent="space-between" width="100%">
                <Grid item xs={12} md={6} xl={12} alignContent={"center"} padding={5}>
                    <GradeAvg/>
                </Grid>
              </Box>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                        <Box display="flex" justifyContent="space-between" width="100%">
                      </Box>       
                </Box>      
            </Box>
          </Grid>
        </Grid>
  
      </Box>
    );
};
