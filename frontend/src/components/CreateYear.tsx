import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";

interface CreateYearProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newYear: Year) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call the onSubmit function with the correctly structured Year object
    onSubmit(formData);

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
              Create New Year
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
                  label="Year"
                  variant="outlined"
                  value={formData.year}
                  onChange={handleInputChange}
                  name="year"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight"
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
                  label="Year Credit"
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
