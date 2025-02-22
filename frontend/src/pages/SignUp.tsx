import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, Autocomplete } from "@mui/material";
import axios from '../api/axios';

interface User {
  fullname: string;
  email: string;
  password: string;
  uni: string | null;
  degreeType: string | null;
  degreeTitle: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    fullname: "",
    email: "",
    password: "",
    uni: null,
    degreeType: null,
    degreeTitle: "",
  });
  const [universities, setUniversities] = useState<string[]>([]);
  const [degreeTypes, setDegreeTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleLogin= async (e: React.FormEvent) => {
      e.preventDefault();
      navigate("/login");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("uni", formData.uni || "");
    data.append("degreeType", formData.degreeType || "");
    data.append("degreeTitle", formData.degreeTitle);

    try {
      const response = await axios.post("/signup", data);
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("Failed to sign up. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const signup = await axios.get("signup/");
        console.log("Response:", signup.data);
        setUniversities(signup.data.universities);
        setDegreeTypes(signup.data.types);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleRedirectToLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <TextField
          label="Full Name"
          name="fullname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.fullname}
          onChange={handleChange}
        />
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
        
        <Autocomplete
          value={formData.uni}
          onChange={(event, newValue) => setFormData({ ...formData, uni: newValue })}
          inputValue={formData.uni || ""}
          onInputChange={(event, newInputValue) => setFormData({ ...formData, uni: newInputValue })}
          options={universities}
          renderInput={(params) => <TextField {...params} label="University" variant="outlined" margin="normal"/>}
          getOptionLabel={(option) => option} 
          noOptionsText="No universities found"
          fullWidth
        />
        
        <Autocomplete
          value={formData.degreeType}
          onChange={(event, newValue) => setFormData({ ...formData, degreeType: newValue })}
          inputValue={formData.degreeType || ""}
          onInputChange={(event, newInputValue) => setFormData({ ...formData, degreeType: newInputValue })}
          options={degreeTypes}
          renderInput={(params) => <TextField {...params} label="Degree Type" variant="outlined" margin="normal"/>}
          getOptionLabel={(option) => option}
          noOptionsText="No degree types found"
          fullWidth
        />

        <TextField
          label="Degree Title"
          name="degreeTitle"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.degreeTitle}
          onChange={handleChange}
        />
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ flex: 1, mr: 1 }}>
            REGISTER
          </Button>
          <Button 
            type="button" 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleLogin}
            sx={{ flex: 1 }}>
            LOGIN
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
