import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { DashBoard } from "./pages/DashBoard";
import { Navbar } from "./components/NavBar";
import { Calculator } from "./pages/Calculator";
import { Analytics } from "./pages/Analytics";
import HomePage from "./pages/Home";

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
  return (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <HomePage/>} />
      

      {/* Protected Routes */}
      <Route element={<Layout />}>
        {/*<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />*/}
        <Route path="/dashboard" element={ <DashBoard/>} />
        <Route path="/calculator" element={ <Calculator/>} />
        <Route path="/analytics" element={ <Analytics/>} />
        
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
