import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "../api/axios"; // Adjust the path to your axios instance

const ModulePage: React.FC = () => {
  const location = useLocation();
  const { module, year } = location.state || {}; // Destructure both module and year

  // State for storing assignments
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [assignmentGrade, setAssignmentGrade] = useState<number | string>("");
  const [assignmentWeight, setAssignmentweight] = useState<number | string>("");

  if (!module || !year) {
    return <Typography variant="h6">Module or Year not found!</Typography>;
  }
  

  // Fetch assignments from the backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`/assignments`);
        setAssignments(response.data.assignments); // Store fetched assignments
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [module.id]);

  // Function to handle assignment form submission
  const handleAddAssignment = async () => {
    if (!assignmentType || !assignmentGrade) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Create a new FormData instance
      const formData = new FormData();
      formData.append("assignment_type", assignmentType);
      formData.append("grade", assignmentGrade.toString());
      formData.append("weight", assignmentWeight.toString());
      formData.append("module_name", module.name);
      formData.append("name", assignmentName);
      formData.append("year", year);


      // Send POST request to add the assignment to the backend
      const response = await axios.post("/assignments/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensuring that the form data is sent correctly
        },
      });

      // Update the assignments list with the new assignment
      setAssignments([...assignments, response.data]);

      // Clear the input fields
      setAssignmentType("");
      setAssignmentGrade("");
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  return (
    <Box padding={3} border={1} borderRadius={5}>
      <Typography variant="h4">{module.name}</Typography>
      <Typography variant="h6">Credits: {module.credits}</Typography>
      <Typography variant="h6">
        Grade: {module.grade !== null ? module.grade : "Not Marked"} {/* Display grade */}
      </Typography>
      <Typography variant="h6">Year: {year}</Typography>


      {/* Form for adding new assignment */}
      <Box mt={3}>
        <Typography variant="h6">Add Assignment</Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Assignment Name"
              fullWidth
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Assignment Type"
              fullWidth
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Grade (%)"
              type="number"
              fullWidth
              value={assignmentGrade}
              onChange={(e) => setAssignmentGrade(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight (%)"
              type="number"
              fullWidth
              value={assignmentWeight}
              onChange={(e) => setAssignmentweight(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAssignment}
          sx={{ mt: 2 }}
        >
          Add Assignment
        </Button>
      </Box>

      {/* Display list of assignments */}
      <Box mt={3}>
        <Typography variant="h6">Assignments</Typography>
        <List>
          {assignments.map((assignment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${assignment.type}`}
                secondary={`Grade: ${assignment.grade}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ModulePage;
