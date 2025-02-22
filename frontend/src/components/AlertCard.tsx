import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Define types for the props
interface AlertCardProps {
  message: string | null;  // The message to display
  onClose: () => void;     // Function to close the alert
  type: 'success' | 'error'; // Type to determine the alert style
}

const AlertCard: React.FC<AlertCardProps> = ({ message, onClose, type }) => {
  // Determine the styles based on the alert type
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? '#4caf50' : '#f44336'; // Green for success, red for error
  const icon = isSuccess ? <CheckCircleIcon /> : <ErrorIcon />; // Icons for success and error
  const iconColor = 'white'; // White icon color for both success and error
  const severity = isSuccess ? 'success' : 'error'; // Material-UI severity for proper icon and styling

  return (
    <Snackbar
      open={!!message} // Snackbar is open if there's a message
      autoHideDuration={10000} // Close the Snackbar after 10 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning at the top-right corner
      sx={{
        '& .MuiSnackbarContent-root': {
          border: `1px solid ${bgColor}`, // Border color based on the type
        },
        cursor: 'pointer', // Ensure the user can interact with it
      }}
      onClick={onClose} // Close on click
    >
      <Alert
        onClose={onClose}
        severity={severity} // Set the severity based on the alert type
        icon={icon}
        sx={{
          width: 'auto', // Adjust width as needed
          color: 'white',
          backgroundColor: bgColor, // Background color based on the type
          '& .MuiAlert-icon': {
            color: iconColor, // Icon color is white for both types
          },
        }}
      >
        {message} {/* Display the message */}
      </Alert>
    </Snackbar>
  );
};

export default AlertCard;