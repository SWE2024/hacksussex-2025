import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, MenuItem, Menu, Fade, IconButton } from "@mui/material";
import { Dashboard, ShowChart, Logout, Settings, DarkMode } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'; // Make sure to import the CSS
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [theme, setTheme] = useState<string>('normal'); // Default theme is 'normal'
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Track dark mode state
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Open settings menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close settings menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Log and apply the theme when it changes
  useEffect(() => {
    console.log("Applying theme:", theme);

    // Remove previously applied themes
    document.body.classList.remove('normal-theme', 'deuteranopia-theme', 'tritanopia-theme', 'total-colour-blind-theme', 'dark-theme');

    // If a theme is set, apply it
    if (theme) {
      document.body.classList.add(`${theme}-theme`); // Apply the selected theme class
    }

    // Apply dark mode
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

  }, [theme, isDarkMode]); // Run effect when either theme or dark mode changes

  // Handle theme change (menu item selection)
  const handleThemeChange = (themeName: string) => {
    console.log(`Theme selected: ${themeName}`);
    setTheme(themeName);  // Update the theme state
    handleMenuClose(); // Close the menu after selecting the theme
  };

  // Toggle dark mode on/off
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev); // Toggle dark mode state
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Button color="inherit" component={Link} to="/dashboard" sx={{ marginRight: 2 }}>
            <Dashboard sx={{ marginRight: 1 }} />
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/analytics" sx={{ marginRight: 2 }}>
            <ShowChart sx={{ marginRight: 1 }} />
            Analytics
          </Button>
        </Box>
        <Button color="inherit" onClick={() => navigate("/login")} sx={{ marginRight: 2 }}>
          <Logout sx={{ marginRight: 1 }} />
          LOGOUT
        </Button>
        <div>
          <Button
            color="inherit"
            id="fade-button"
            sx={{ marginRight: 2 }}
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuOpen}
          >
            <Settings sx={{ marginRight: 1 }} />
            Settings
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-menu',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleThemeChange('normal')}>Normal</MenuItem>
            <MenuItem onClick={() => handleThemeChange('deuteranopia')}>Deuteranopia/Protanopia</MenuItem>
            <MenuItem onClick={() => handleThemeChange('tritanopia')}>Tritanopia</MenuItem>
            <MenuItem onClick={() => handleThemeChange('total-colour-blind')}>Total Colour Blind</MenuItem>
          </Menu>
        </div>

        {/* Dark Mode Toggle */}
        <DarkModeIcon color="inherit" onClick={toggleDarkMode}>
          <DarkMode />
        </DarkModeIcon>
      </Toolbar>
    </AppBar>
  );
};
