import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";

interface User {
  fullname: string;
  email: string;
  password: string;
  uni: string;
  degreeType: string;
  degreeTitle: string;
}

const universities = ["University of Sussex", "University of Oxford", "University of Cambridge", "Imperial College London"];
const degreeTypes = ["BSc", "BA", "MSc", "MA", "PhD"];

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    fullname: "",
    email: "",
    password: "",
    uni: "",
    degreeType: "",
    degreeTitle: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // Submit logic here
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
        <TextField
          select
          label="University"
          name="uni"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.uni}
          onChange={handleChange}
        >
          {universities.map((uni) => (
            <MenuItem key={uni} value={uni}>
              {uni}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Degree Type"
          name="degreeType"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.degreeType}
          onChange={handleChange}
        >
          {degreeTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Degree Title"
          name="degreeTitle"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.degreeTitle}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
