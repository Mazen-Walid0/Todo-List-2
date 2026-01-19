import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Alexandria, sans-serif",
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "jdhgfoiwh ewtw wret ",
    details: "wrt rew wret rwtqe4t  wqrt wr",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "rwt rwer  werter wret wet",
    details: "erwy trer erwtweuret   rtyet ew",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "ekwghre  wetghwru gr",
    details: "wtn wkr rt fgukshd  w,jth ",
    isCompleted: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // بدل center
            minHeight: "100vh", // بدل height
            backgroundColor: "#191b1f",
            direction: "rtl",
            paddingTop: "40px",
          }}
        >
          {/* <div style={{ height: "100vh" }}> */}
          <TodoList />
          {/* </div> */}
        </div>
      </ThemeProvider>
    </TodosContext.Provider>
  );
}
