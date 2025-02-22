import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";

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
