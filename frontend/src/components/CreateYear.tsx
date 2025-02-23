import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface Year {
    year: string;
    credits: number;
    weight: number;
  }
  
  
interface CreateYearProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newYear: Year) => void;
}

const CreateYear: React.FC<CreateYearProps> = ({ open, onClose, onSubmit }) => {
  const [year, setYear] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleSubmit = () => {
    const newYear: Year = {
      year,
      credits,
      weight,
    };
    onSubmit(newYear); // Pass the new year object to the parent
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Year</DialogTitle>
      <DialogContent>
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Credits"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateYear;
