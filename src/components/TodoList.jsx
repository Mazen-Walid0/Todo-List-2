// Material Ui
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
// Components
import Todo from "./Todo.";
import { TodosContext } from "../contexts/todosContext";

import { useEffect, useState, useContext } from "react";

// Others
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [detailsInput, setDetailsInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTitleInput("");
    setDetailsInput("");
  }

  useEffect(() => {
    const todosLocalStorage = JSON.parse(localStorage.getItem("todos"));
    todosLocalStorage && setTodos(todosLocalStorage);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  const todosJsx = todosToBeRendered.map((t) => <Todo todo={t} key={t.id} />);
  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          <Typography variant="h1">مهامى</Typography>
          <Divider />
          {/* Start Toggle Buttons Group*/}
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
          {/* End Toggle Buttons Group*/}
          {/* Start All Todos */}
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              // marginTop: "20px",
            }}
          >
            {todosJsx}
          </div>
          {/* End All Todos */}
          {/* Start Input + Add Button */}
          <Grid container sx={{ marginTop: 3 }} spacing={2}>
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

            {/* Button */}
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
          {/* End Input + Add Button */}
        </CardContent>
      </Card>
    </Container>
  );
}
