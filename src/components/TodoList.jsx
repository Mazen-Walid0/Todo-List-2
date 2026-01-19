// =======================
// Material UI Components
// =======================
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// =======================
// Custom Components
// =======================
import Todo from "./Todo.";
import { TodosContext } from "../contexts/todosContext";

// =======================
// React Hooks
// =======================
import { useEffect, useState, useContext } from "react";

// =======================
// Utilities
// =======================
import { v4 as uuidv4 } from "uuid";

// =======================
// TodoList Component
// =======================
export default function TodoList() {
  // Get todos state from context
  const { todos, setTodos } = useContext(TodosContext);

  // State for form inputs
  const [detailsInput, setDetailsInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  // State for filtering displayed todos
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // =======================
  // Add New Todo Handler
  // =======================
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(), // Generate unique ID
      title: titleInput, // Todo title
      details: detailsInput, // Todo details
      isCompleted: false, // Completion status
    };

    // Update state with new todo
    setTodos((prev) => [...prev, newTodo]);

    // Save updated todos to localStorage
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

    // Reset input fields
    setTitleInput("");
    setDetailsInput("");
  }

  useEffect(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem("todos"));
    // Load todos from localStorage on initial render only
    // setTodos is added to dependency array to follow React Hooks rules
    todosLocalStorage && setTodos(todosLocalStorage);
  }, [setTodos]);

  // =======================
  // Change Filter Type
  // =======================
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // Filter completed todos
  const completedTodos = todos.filter((t) => t.isCompleted);

  // Filter non-completed todos
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  // Determine which todos to render
  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  // Map todos to JSX components
  const todosJsx = todosToBeRendered.map((t) => <Todo todo={t} key={t.id} />);

  return (
    // Main container
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          {/* App title */}
          <Typography variant="h1">مهامى</Typography>
          <Divider />

          {/* =======================
              Toggle Buttons Group
             ======================= */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
          >
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {/* =======================
              Todos List Container
             ======================= */}
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {todosJsx}
          </div>

          {/* =======================
              Input Fields + Add Button
             ======================= */}
          <Grid container sx={{ marginTop: 3 }} spacing={2}>
            {/* Inputs section */}
            <Grid size={8} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                fullWidth
              />

              <TextField
                label="تفاصيل المهمة"
                variant="outlined"
                value={detailsInput}
                onChange={(e) => setDetailsInput(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            {/* Add button section */}
            <Grid
              size={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onClick={handleAddClick}
                variant="contained"
                sx={{ width: "100%", height: "60%" }}
                disabled={titleInput.length == 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
