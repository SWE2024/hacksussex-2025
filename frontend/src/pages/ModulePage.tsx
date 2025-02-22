import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const ModulePage: React.FC = () => {
  const { moduleName } = useParams<{ moduleName: string }>(); // Get module name from URL
  const location = useLocation();
  const module = location.state?.module;

  if (!module) {
    return <Typography variant="h6">Module not found!</Typography>;
  }

  return (
    <Box padding={3} border={1} borderRadius={5}>
      <Typography variant="h4">{module.name}</Typography>
      <Typography variant="h6">Credits: {module.credit}</Typography>
      <Typography variant="h6">Grade: {module.grade !== null ? module.grade : "Not Marked"}</Typography>
    </Box>
  );
};

export default ModulePage;
