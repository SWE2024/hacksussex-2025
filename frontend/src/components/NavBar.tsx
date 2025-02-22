import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  MenuItem,
  Fade,

} from "@mui/material";
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from "react-router-dom";
import {Dashboard, Work, Logout, ShowChart, Settings} from '@mui/icons-material';


export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Button color="inherit" component={Link} to="/dashboard" sx={{marginRight: 2}}>
            <Dashboard sx={{ marginRight: 1 }} />
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/analytics" sx={{marginRight: 2}}>
            <ShowChart sx={{ marginRight: 1 }} />
            Analytics
          </Button>
        </Box>
        <Button color="inherit" onClick={handleLogout} sx={{marginRight: 2}}>
            <Logout sx={{ marginRight: 1 }} />
            LOGOUT
          </Button>
            <div>
            <Button 
                color="inherit" 
                id ="fade-button" 
                sx={{marginRight: 2}}
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup = "true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuOpen}
            >
                <Settings sx={{ marginRight: 1 }} />
                Settings
            </Button>
            <Menu
                id = "fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-menu',
                }}
                anchorEl = {anchorEl}
                open = {open}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleMenuClose}>Normal</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Deuteranopia/Protanopia</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Tritanopia</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Total Colour Blind</MenuItem>
                </Menu>
            </div>
              
      </Toolbar>
    </AppBar>
  );
};
