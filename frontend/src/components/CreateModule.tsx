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
  onSubmit: (newModule: Module) => void;
}

interface Module {
  module_name: string;
  credit: number;
  year: string;
}

const CreateModule: React.FC<CreateModuleProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Module>({
    module_name: "",
    credit: 0,
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
    onSubmit(formData);
    setFormData({
        module_name: "",
        credit: 0,
        year: "",
    });
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
                  label="Module Credit"
                  variant="outlined"
                  value={formData.credit}
                  onChange={handleInputChange}
                  name="credit"
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