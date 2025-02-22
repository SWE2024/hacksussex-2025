import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import LogIn from "./pages/LogIn";

function Layout() {

  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        {/*<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />*/}

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
