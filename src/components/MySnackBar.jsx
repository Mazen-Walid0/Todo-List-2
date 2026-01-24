// Import Material UI components for snackbar and alerts
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// Snackbar component for showing success messages
export default function MySnackBar({ open, message }) {
  // Close button displayed inside the snackbar
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close" // Accessibility: close button label
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {/* Wrapper for spacing and layout */}
      <Stack spacing={2}>
        {/* Snackbar container */}
        <Snackbar
          open={open} // Control snackbar visibility
          direction="rtl" // Enable RTL layout for Arabic content
          message="Note archived" // Default fallback message
          action={action} // Custom close action
        >
          {/* Alert component for styled success message */}
          <Alert
            severity="success" // Success status styling
            variant="filled" // Filled alert style
            sx={{ width: "100%" }} // Full width inside snackbar
          >
            {/* Dynamic message content */}
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
