import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import AlertCard from "../components/AlertCard";
import axios from "../api/axios";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: ""

  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin= async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    try {
      const response = await axios.post("/login", data);
      document.cookie = `email=${formData.email}`;
      const successMessage = response.data.detail || "Login successfully";
      setAlertMessage(successMessage);
      setAlertType("success");

      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail
        error.response?.data?.message
        error.message || // Fallback to Axios error message
        "An unexpected error occurred"; // Default message

      setAlertMessage(errorMessage);
      setAlertType("error");
      console.error("Error during Login", error);
    }
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
            onClick={()=> navigate("/register")}
            sx={{ flex: 1 }}>
            Register
          </Button>
        </Box>
      </form>
      <AlertCard message={alertMessage} onClose={()=>setAlertMessage(null)} type={alertType} />
    </Box>
  );
};

export default Login;
