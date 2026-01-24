// Import global styles
import "./App.css";

// Import main TodoList component
import TodoList from "./components/TodoList";

// Import MUI theme utilities
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Import Todos context provider
import TodosProvider from "./contexts/TodosProvider";

// Import Toast context provider
import { ToastProvider } from "./contexts/ToastProvider";

// =======================
// Custom MUI Theme
// =======================
const theme = createTheme({
  typography: {
    fontFamily: "Alexandria, sans-serif", // Set global font family
  },
});

// =======================
// Main App Component
// =======================
export default function App() {
  return (
    // Apply MUI theme to the entire app
    <ThemeProvider theme={theme}>
      {/* Provide global todos state */}
      <TodosProvider>
        {/* Provide global toast notifications */}
        <ToastProvider>
          {/* Main app container */}
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: "100vh",
              backgroundColor: "#191b1f", // Dark background
              direction: "rtl", // Right-to-left layout for Arabic
              paddingTop: "40px",
            }}
          >
            {/* Render main todo list */}
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}
