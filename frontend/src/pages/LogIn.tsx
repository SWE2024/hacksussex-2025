import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";

interface User {
  email: string;
  password: string;
}

const universities = ["University of Sussex", "University of Oxford", "University of Cambridge", "Imperial College London"];
const degreeTypes = ["BSc", "BA", "MSc", "MA", "PhD"];

const LogIn: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: ""

  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin= async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const handleRegister= async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/signup");
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ flex: 1, mr: 1 }}>
            LOGIN
          </Button>
          <Button 
            type="button" 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleRegister}
            sx={{ flex: 1 }}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LogIn;
