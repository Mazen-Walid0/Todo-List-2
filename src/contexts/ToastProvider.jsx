// Import React hook for managing component state
import { useState } from "react";

// Import snackbar component
import MySnackBar from "../components/MySnackBar";

// Import toast context
import { ToastContext } from "./ToastContext";

// Provider component for managing global toast notifications
export const ToastProvider = ({ children }) => {
  // Controls snackbar visibility
  const [open, setOpen] = useState(false);

  // Stores current toast message
  const [message, setMessage] = useState("");

  // Show toast with custom message and auto-hide after delay
  function showHideToast(text) {
    setMessage(text);
    setOpen(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      {/* Global snackbar component */}
      <MySnackBar open={open} message={message} />

      {/* Render wrapped application components */}
      {children}
    </ToastContext.Provider>
  );
};
