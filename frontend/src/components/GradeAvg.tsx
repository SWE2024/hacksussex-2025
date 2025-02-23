import React, { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, ButtonBase, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import CreateModule from "./CreateModule";
import CreateYear from "./CreateYear";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Module {
  name: string;
  grade: number | null;
  credits: number;
}

const GradeAvg: React.FC = () => {
  const calculateWeightedAverage = (modules: Module[]) => {
    const validModules = modules.filter(module => module.grade !== null);

    const totalWeightedGrade = validModules.reduce((sum, module) => sum + (module.grade! * module.credits), 0);
    const totalCredits = modules.reduce((sum, module) => sum + module.credits, 0);
    const markedCredits = validModules.reduce((sum, module) => sum + module.credits, 0);
    const unmarkedCredits = totalCredits - markedCredits;

    const weightedAverage = markedCredits > 0 ? totalWeightedGrade / markedCredits : 0;

    const achievedPercentage = (weightedAverage / 100) * (markedCredits / totalCredits) * 100;
    const remainingPercentage = (unmarkedCredits / totalCredits) * 100;
    const lostPercentage = 100 - achievedPercentage - remainingPercentage;

    return { weightedAverage, achievedPercentage, lostPercentage, remainingPercentage };
  };

  const [modules, setModules] = useState<Module[]>([]); // State to store modules
  const navigate = useNavigate();

  const [years, setYears] = useState<any[]>([]);
  const [openCreateModule, setOpenCreateModule] = useState(false);
  const [openCreateYear, setOpenCreateYear] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);


  const { weightedAverage, achievedPercentage, lostPercentage, remainingPercentage } = calculateWeightedAverage(modules);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("/year");
        console.log("Years data:", response.data);
        setYears(response.data.years);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    const fetchModules = async (year: string | null) => {
      if (!year) return; // Guard against undefined year

      try {
        const response = await axios.get(`/modules`, {
          params: {
            year: year, // Passing the selected year as a query parameter
          },
        });
        console.log("Modules data:", response.data);
        setModules(response.data.modules); // Store fetched modules
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchYears();
    if (selectedYear) {
      fetchModules(selectedYear); // Fetch modules when selectedYear changes
    }
  }, [selectedYear, refreshKey]);

  const handleModuleClick = (module: Module, year: string|null) => {
    console.log("Navigating to:", module.name);
    navigate(`/module/${encodeURIComponent(module.name)}`, { state: { module, year } });
  };
  

  const handleCreateYear = async (formData: FormData) => {
    try {
      const response = await axios.post("/year/create", formData);
      const successMessage = response.data.detail || "Year added successfully";
      setAlertMessage(successMessage);
      setAlertType("success");
      setRefreshKey(prevKey => prevKey + 1); // Trigger data refetch

    } catch (error: any) {
      let errorMessage = "Error adding Year";

      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else {
            errorMessage = Object.entries(error.response.data)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n");
          }
        }
      }
      setAlertMessage(errorMessage);
      setAlertType("error");
    }
  };

  const handleCreateModule = async (formData: FormData) => {
    try {
      // Send a POST request to create a new module
      const response = await axios.post("/module/create", formData);
      // Get the success message from the response
      const successMessage = response.data.detail || "Module added successfully";
      // Display success message
      setAlertMessage(successMessage);
      setAlertType("success");
      setRefreshKey(prevKey => prevKey + 1); // Trigger data refetch
    } catch (error: any) {
      let errorMessage = "Error adding module";
      // Extract error messages from response
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === "object") {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else {
            errorMessage = Object.entries(error.response.data)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n");
          }
        }
      }
      // Display error message
      setAlertMessage(errorMessage);
      setAlertType("error");
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="60vh" padding={3} borderRadius={5} border={1}>
      <Box display={"flex"} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom>
          Grade Average
        </Typography>
        <Box>
          {years.map((year) => (
            <Button
              key={year.id}
              onClick={() => {
                setSelectedYear(`${year.num}`);
              }}
            >
              {`Year ${year.num}`}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom>Weighted Average</Typography>
          <Box>
            {/* IconButton with Tooltip for Adding Year */}
            <Tooltip title="Add Year">
              <IconButton color="primary" onClick={() => setOpenCreateYear(true)}>
                <Add />
              </IconButton>
            </Tooltip>

            {/* IconButton with Tooltip for Adding Module */}
            <Tooltip title="Add Module">
              <IconButton color="primary" onClick={() => setOpenCreateModule(true)}>
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Stacked Progress Bar */}
        <Box sx={{ width: "100%", height: 25, borderRadius: 5, overflow: "hidden", display: "flex", mt: 2 }}>
          {/* Achieved */}
          <Box sx={{ width: `${achievedPercentage}%`, backgroundColor: "#28b463" }} />
          {/* Remaining */}
          <Box sx={{ width: `${remainingPercentage}%`, backgroundColor: "#2e86c1" }} />
          {/* Lost */}
          <Box sx={{ width: `${lostPercentage}%`, backgroundColor: "#a93226" }} />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2" color="#28b463">{`Achieved: ${achievedPercentage.toFixed(1)}%`}</Typography>
          <Typography variant="body2" color="#2e86c1">{`Remaining: ${remainingPercentage.toFixed(1)}%`}</Typography>
          <Typography variant="body2" color="#a93226">{`Lost: ${lostPercentage.toFixed(1)}%`}</Typography>
        </Box>
      </Box>
      <Box sx={{overflowY: 'auto'}}>

        <List sx={{ width: "100%" }} >
            {modules.map((module) => (
            <ButtonBase key={module.name} onClick={() => handleModuleClick(module, selectedYear)} sx={{ width: "100%", textAlign: "left" }}>
                <ListItem sx={{ marginBottom: 1, display: 'flex', justifyContent: "space-between", paddingX: 2 }}>
                <Box>
                    <ListItemText primary={module.name} />
                    <ListItemText primary={`Credits: ${module.credits}`} />
                </Box>
                <ListItemText 
                    primary={module.grade !== null ? `Grade: ${module.grade}` : "Not Marked"} 
                    sx={{ flex: 1, textAlign: 'right', fontStyle: module.grade === null ? 'italic' : 'normal' }} 
                />
                </ListItem>
            </ButtonBase>
            ))}
        </List>
      </Box>
      <CreateModule
        open={openCreateModule}
        onClose={() => setOpenCreateModule(false)}
        onSubmit={handleCreateModule}
      />

      <CreateYear
        open={openCreateYear}
        onClose={() => setOpenCreateYear(false)}
        onSubmit={handleCreateYear}
      />
    </Box>
  );
};

export default GradeAvg;
