"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material"
import axios from "../api/axios" // Adjust the path to your axios instance

// Types
interface Assignment {
  name: string
  grade: number
  type: string
  weight: number
}

interface Module {
  id: string
  name: string
  credits: number
  grade: number | null
}

const ModulePage: React.FC = () => {
  const location = useLocation()
  const { module, year } = (location.state as { module: Module; year: string }) || {}

  // State
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [assignmentForm, setAssignmentForm] = useState({
    name: "",
    type: "",
    grade: "",
    weight: "",
  })
  const [refreshKey, setRefreshKey] = useState(0)

  // Effects
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!module || !year) return

      try {
        const response = await axios.get("/assignments", {
          params: { year, module_name: module.name },
        })
        setAssignments(response.data)
      } catch (error) {
        console.error("Error fetching assignments:", error)
      }
    }

    fetchAssignments()
  }, [module, year, refreshKey])

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAssignmentForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAssignment = async () => {
    if (!module || !year) return

    const { name, type, grade, weight } = assignmentForm
    if (!name || !type || !grade || !weight) {
      alert("Please fill in all fields")
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("assignment_type", type)
      formData.append("grade", grade)
      formData.append("weight", weight)
      formData.append("module_name", module.name)
      formData.append("year", year)

      await axios.post("/assignments/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setRefreshKey((prev) => prev + 1)
      setAssignmentForm({ name: "", type: "", grade: "", weight: "" })
    } catch (error) {
      console.error("Error adding assignment:", error)
    }
  }

  if (!module || !year) {
    return <Typography variant="h6">Module or Year not found!</Typography>
  }

  return (
    <Box padding={3}>
      <Grid container spacing={3}>
        {/* Assignments list */}
        <Grid item xs={12} md={8}>
          <AssignmentsList assignments={assignments} />
        </Grid>

        {/* Assignment form */}
        <Grid item xs={12} md={4}>
          <ModuleInfo module={module} year={year} />
          <AssignmentForm formData={assignmentForm} onInputChange={handleInputChange} onSubmit={handleAddAssignment} />
        </Grid>
      </Grid>
    </Box>
  )
}

// Sub-components
const AssignmentsList: React.FC<{ assignments: Assignment[] }> = ({ assignments }) => (
  <Box padding={2} borderRadius={5} border={1} boxShadow={2}>
    <Typography variant="h4" sx={{ marginBottom: 2 }}>
      Assignments
    </Typography>
    <Grid container spacing={2}>
      {assignments.map((assignment, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {assignment.name}
              </Typography>
              <Typography variant="body2">Grade: {assignment.grade}%</Typography>
              <Typography variant="body2">Weight: {assignment.weight}%</Typography>
              <Typography variant="body2">Type: {assignment.type}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)


const ModuleInfo: React.FC<{ module: Module; year: string }> = ({ module, year }) => (
  <Box padding={2} borderRadius={5} border={1} boxShadow={2} marginBottom={2}>
    <Typography variant="h4">{module.name}</Typography>
    <Typography variant="h6">Credits: {module.credits}</Typography>
    <Typography variant="h6">Grade: {module.grade !== undefined ? `${module.grade}%`: "Not Marked"}</Typography>
    <Typography variant="h6">Year: {year}</Typography>
  </Box>
)

const AssignmentForm: React.FC<{
  formData: { name: string; type: string; grade: string; weight: string }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}> = ({ formData, onInputChange, onSubmit }) => (
  <Box padding={2} borderRadius={5} border={1} boxShadow={2}>
    <Typography variant="h6" marginBottom={2}>
      Add Assignment
    </Typography>
    <Grid container spacing={2}>
      {["name", "type", "grade", "weight"].map((field) => (
        <Grid item xs={12} key={field}>
          <TextField
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            fullWidth
            value={formData[field as keyof typeof formData]}
            onChange={onInputChange}
            type={field === "grade" || field === "weight" ? "number" : "text"}
          />
        </Grid>
      ))}
    </Grid>
    <Button variant="contained" color="primary" onClick={onSubmit} sx={{ marginTop: 2, width: "100%" }}>
      Add Assignment
    </Button>
  </Box>
)

export default ModulePage

