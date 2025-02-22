import React, {useState} from "react";
import { Box, Button,Typography, List, ListItem, ListItemText, IconButton, ButtonBase } from "@mui/material";
import {Add} from "@mui/icons-material";
import CreateModule from "./CreateModule";
import { useNavigate } from "react-router-dom";

interface Module {
  name: string;
  grade: number | null; 
  credit: number;
}

const modules: Module[] = [
  { name: "Databases", grade: 60, credit: 20 },
  { name: "Neural Networks", grade: 70, credit: 10 },
  { name: "Compilers", grade: null, credit: 10 },
];

const GradeAvg: React.FC = () => {
  const calculateWeightedAverage = (modules: Module[]) => {
    const validModules = modules.filter(module => module.grade !== null);
    
    const totalWeightedGrade = validModules.reduce((sum, module) => sum + (module.grade! * module.credit), 0);
    const totalCredits = modules.reduce((sum, module) => sum + module.credit, 0);
    const markedCredits = validModules.reduce((sum, module) => sum + module.credit, 0);
    const unmarkedCredits = totalCredits - markedCredits;
    
    const weightedAverage = markedCredits > 0 ? totalWeightedGrade / markedCredits : 0;

    const achievedPercentage = (weightedAverage / 100) * (markedCredits / totalCredits) * 100;
    const remainingPercentage = (unmarkedCredits / totalCredits) * 100;
    const lostPercentage = 100 - achievedPercentage - remainingPercentage;

    return { weightedAverage, achievedPercentage, lostPercentage, remainingPercentage };
  };

  const [openCreateModule, setOpenCreateModule] = useState(false);

  const { weightedAverage, achievedPercentage, lostPercentage, remainingPercentage } = calculateWeightedAverage(modules);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const navigate = useNavigate();

  const handleModuleClick = (module: Module) => {
    console.log("Navigating to:", module.name);
    navigate(`/module/${encodeURIComponent(module.name)}`, { state: { module } }); // ✅ Navigate correctly
  };
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="60vh" padding={3} borderRadius={5} border={1}>

      <Box display={"flex"} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom>
        Grade Average
        </Typography>
        <Box>
            <Button>
            Year 1
            </Button>
            <Button>
            Year 2
            </Button>
            <Button>
            Year 3 
            </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom>
          Weighted Average: {weightedAverage.toFixed(2)}
          </Typography>
          <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => {
                console.log("Opening CreateModule...");
                setOpenCreateModule(true);
              }}            >
              Add Module
            </Button>
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

      <List sx={{ width: "100%" }}>
        {modules.map((module) => (
          <ButtonBase key={module.name} onClick={() => handleModuleClick(module)} sx={{ width: "100%", textAlign: "left" }}>
            <ListItem sx={{ marginBottom: 1, display: 'flex', justifyContent: "space-between", paddingX: 2 }}>
              <Box>
                <ListItemText primary={module.name} />
                <ListItemText primary={`Credits: ${module.credit}`} />
              </Box>
              <ListItemText 
                primary={module.grade !== null ? `Grade: ${module.grade}` : "Not Marked"} 
                sx={{ flex: 1, textAlign: 'right', fontStyle: module.grade === null ? 'italic' : 'normal' }} 
              />
            </ListItem>
          </ButtonBase>
        ))}
      </List>

      <CreateModule
        open={openCreateModule}
        onClose={() => setOpenCreateModule(false)}
        onSubmit={()=>{}}
      />
    </Box>
  );
};

export default GradeAvg;
