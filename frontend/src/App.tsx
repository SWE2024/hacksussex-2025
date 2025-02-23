import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { DashBoard } from "./pages/DashBoard";
import { Navbar } from "./components/NavBar";
import { Analytics } from "./pages/Analytics";
import HomePage from "./pages/Home";
import ModulePage from "./pages/ModulePage";
import React, { useState, useEffect } from "react";

function Layout() {

  return (
    <>
      <CssBaseline />
      <Navbar/>
      <Outlet />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState<string>('normal')

    useEffect(() => {
    // Apply the theme globally
    document.body.classList.remove('normal-theme', 'deuteranopia-theme', 'tritanopia-theme', 'total-colour-blind-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);
  return (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <HomePage/>} />
      

      {/* Protected Routes */}
      <Route element={<Layout />}>
        {/*<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />*/}
        <Route path="/dashboard" element={ <DashBoard/>} />
        <Route path="/analytics" element={ <Analytics/>} />
        <Route path="/module/:moduleName" element={<ModulePage />} />
        
      </Route>

      {/* Catch-all route for undefined paths */}
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      
      <App />
    </Router>
  );
}
