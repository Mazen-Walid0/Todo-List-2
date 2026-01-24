// =======================
// Material UI Components
// =======================
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// =======================

// Import React hooks and contexts
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

// Todo item component
export default function Todo({ todo, showDelete, showEdit }) {
  // Access dispatcher for todos state management
  const { dispatch } = useContext(TodosContext);

  // Access toast notification handler
  const { showHideToast } = useContext(ToastContext);

  // Toggle todo completion status
  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: { id: todo.id } });

    // Show feedback message based on completion state
    !todo.isCompleted
      ? showHideToast("تم إتمام المهمة بنجاح")
      : showHideToast("أصبحت المهمة غير منجزه");
  }

  return (
    <>
      {/* Main todo card container */}
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593", // Card background color
          color: "white", // Text color
          marginTop: 5, // Vertical spacing
        }}
      >
        <CardContent>
          {/* Layout container for todo content */}
          <Grid container spacing={2}>
            {/* Todo text section */}
            <Grid size={8}>
              {/* Todo title */}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted && "line-through", // Strike when completed
                }}
              >
                {todo.title}
              </Typography>

              {/* Todo details */}
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted && "line-through", // Strike when completed
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* Action Buttons Section*/}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Toggle completion button */}
              <IconButton
                onClick={() => handleCheckClick()} // Toggle completed state
                className="iconButtons"
                aria-label="complete"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: `solid ${todo.isCompleted ? "white" : "#8bc34a"} 3px`,
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* Edit todo button */}
              <IconButton
                onClick={() => showEdit(todo)} // Open edit dialog
                className="iconButtons"
                aria-label="edit"
                sx={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>

              {/* Delete todo button */}
              <IconButton
                onClick={() => showDelete(todo)} // Open delete dialog
                className="iconButtons"
                aria-label="delete"
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  border: "solid red 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
