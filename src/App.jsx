// Import global styles
import "./App.css";

// Import main TodoList component
import TodoList from "./components/TodoList";

// Import MUI theme utilities
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Import Todos context
import { TodosContext } from "./contexts/todosContext";

// Import UUID generator
import { v4 as uuidv4 } from "uuid";

// Import React hook
import { useState } from "react";

// Create custom MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "Alexandria, sans-serif", // Set global font family
  },
});

// Initial todo list data
const initialTodos = [
  {
    id: uuidv4(), // Generate unique ID
    title: "jdhgfoiwh ewtw wret ",
    details: "wrt rew wret rwtqe4t  wqrt wr",
    isCompleted: false, // Task completion status
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "rwt rwer  werter wret wet",
    details: "erwy trer erwtweuret   rtyet ew",
    isCompleted: false,
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "ekwghre  wetghwru gr",
    details: "wtn wkr rt fgukshd  w,jth ",
    isCompleted: false,
  },
];

// Main App component
export default function App() {
  // State to manage todos list
  const [todos, setTodos] = useState(initialTodos);

  return (
    //  Provide todos state to all child components
    <TodosContext.Provider value={{ todos, setTodos }}>
      {/* Apply MUI theme to the app */}
      <ThemeProvider theme={theme}>
        {/* Main app container */}
        <div
          className="App"
          style={{
            display: "flex", // Use flexbox layout
            justifyContent: "center", // Center horizontally
            alignItems: "flex-start", // Align items to top
            minHeight: "100vh", // Full viewport height
            backgroundColor: "#191b1f", // Dark background
            direction: "rtl", // Right-to-left layout
            paddingTop: "40px", // Top spacing
          }}
        >
          {/* Render TodoList component */}
          <TodoList />
        </div>
      </ThemeProvider>
    </TodosContext.Provider>
  );
}
