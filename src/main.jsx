// Import React StrictMode for highlighting potential problems
import { StrictMode } from "react";

// Import React 18 root API
import { createRoot } from "react-dom/client";

// Import main App component
import App from "./App.jsx";

// Create React root and render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Render the main App component */}
    <App />
  </StrictMode>,
);
