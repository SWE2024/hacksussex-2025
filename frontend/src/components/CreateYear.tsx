import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";

interface CreateYearProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void; 
}

interface Year {
  year: string;
  credits: number;
  weight: number;
}

const CreateYear: React.FC<CreateYearProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Year>({
    year: "",
    credits: 0,
    weight: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "credits" || name === "weight" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append form data
    formDataToSend.append("year", formData.year);
    formDataToSend.append("credits", String(formData.credits)); // Convert to string
    formDataToSend.append("weight", String(formData.weight));   // Convert to string

    // Call the onSubmit function with FormData
    onSubmit(formDataToSend);

    // Reset form data after submitting
    setFormData({
      year: "",
      credits: 0,
      weight: 0,
    });

    // Close the drawer
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minHeight: "90vh",
          maxHeight: "99vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: "24px",
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              Add New Year
            </Typography>
            <Box>
              <IconButton color="primary" onClick={handleSubmit} size="large">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={onClose} size="large">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Year</InputLabel>
                  <Select
                    value={formData.year}
                    onChange={handleSelectChange}
                    name="year"
                    label="Year"
                  >
                  <MenuItem value="1">Year 1</MenuItem>
                  <MenuItem value="2">Year 2</MenuItem>
                  <MenuItem value="3">Year 3</MenuItem>
                </Select>
              </FormControl>

              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight (%)"
                  variant="outlined"
                  value={formData.weight}
                  onChange={handleInputChange}
                  name="weight"
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Year Credits"
                  variant="outlined"
                  value={formData.credits}
                  onChange={handleInputChange}
                  name="credits"
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Drawer>
  );
};

export default CreateYear;
