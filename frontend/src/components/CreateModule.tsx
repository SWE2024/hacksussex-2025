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
  MenuItem,
  Select,
} from "@mui/material";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";

interface CreateModuleProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void; // Updated to expect FormData
}

const CreateModule: React.FC<CreateModuleProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    module_name: "",
    credits: 0,
    year: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "credit" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData and append values
    const formDataToSend = new FormData();
    formDataToSend.append("module_name", formData.module_name);
    formDataToSend.append("credits", String(formData.credits)); // Convert to string
    formDataToSend.append("year", formData.year);

    // Call onSubmit with the FormData object
    onSubmit(formDataToSend);

    // Reset form data after submitting
    setFormData({
      module_name: "",
      credits: 0,
      year: "",
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
              Create New Module
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
                <TextField
                  fullWidth
                  label="Module Name"
                  variant="outlined"
                  value={formData.module_name}
                  onChange={handleInputChange}
                  name="module_name"
                  required
                />
              </Grid>

              {/* Year Selection Dropdown */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={formData.year}
                    onChange={handleInputChange}
                    name="year"
                    required
                  >
                    <MenuItem value="Year 1">Year 1</MenuItem>
                    <MenuItem value="Year 2">Year 2</MenuItem>
                    <MenuItem value="Year 3">Year 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Module Credit"
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

export default CreateModule;
