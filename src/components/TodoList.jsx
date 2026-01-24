// Import Material UI components used for layout and UI elements
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Import custom components and contexts
import Todo from "./Todo.";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

// Import React hooks
import { useEffect, useState, useMemo, useContext } from "react";

export default function TodoList() {
  // Access todos state and dispatcher from context
  const { todos, dispatch } = useContext(TodosContext);

  // Access toast notification handler
  const { showHideToast } = useContext(ToastContext);

  // States for add-todo inputs
  const [detailsInput, setDetailsInput] = useState("");
  const [titleInput, setTitleInput] = useState("");

  // Controls which todos are displayed (all / completed / non-completed)
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Holds the currently selected todo for dialogs
  const [dialogTodo, setDialogTodo] = useState(null);

  // Controls delete dialog visibility
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Controls edit dialog visibility
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Stores editable values for the selected todo
  const [editTodo, setEditTodo] = useState({
    title: "",
    details: "",
  });

  // Handles adding a new todo
  function handleAddClick() {
    dispatch({ type: "added", payload: { titleInput, detailsInput } });
    setTitleInput("");
    setDetailsInput("");
    showHideToast("تم إضافة مهمة جديدة بنجاح");
  }

  // Load all todos when component mounts
  useEffect(() => {
    dispatch({ type: "getAllTodos" });
  }, [dispatch]);

  // Change displayed todos filter
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // Memoized list of completed todos
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  // Memoized list of uncompleted todos
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  // Determine which todos should be rendered
  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  // Open delete confirmation dialog
  function handleDeleteDialogOpen(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  // Close delete dialog
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  // Confirm and execute delete action
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("تم حذف المهمة بنجاح");
  }

  // Open edit dialog and preload todo data
  function handleEditDialogOpen(todo) {
    setDialogTodo(todo);
    setEditTodo({
      title: todo.title,
      details: todo.details,
    });
    setShowEditDialog(true);
  }

  // Close edit dialog
  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  // Confirm edit and update todo in global state
  function handleEditConfirm() {
    dispatch({ type: "edit", payload: { dialogTodo, editTodo } });
    setShowEditDialog(false);
    showHideToast("تم التعديل على المهمة بنجاح");
  }

  // Generate Todo components from filtered todos list
  const todosJsx = todosToBeRendered.map((t) => (
    <Todo
      todo={t} // Pass todo data to child component
      key={t.id} // Unique key for React rendering optimization
      showDelete={handleDeleteDialogOpen} // Handler for delete action
      showEdit={handleEditDialogOpen} // Handler for edit action
    />
  ));

  return (
    <>
      {/* Start Delete Modal */}
      {/* Dialog for confirming todo deletion */}
      <Dialog
        sx={{ direction: "rtl" }} // Enable RTL layout for Arabic content
        open={showDeleteDialog} // Control dialog visibility
        onClose={handleDeleteDialogClose} // Close dialog on backdrop click
        aria-labelledby="alert-dialog-title" // Accessibility: dialog title reference
        aria-describedby="alert-dialog-description" // Accessibility: dialog description reference
      >
        {/* Delete dialog title */}
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف المهمة؟
        </DialogTitle>

        <DialogContent>
          {/* Warning message for irreversible action */}
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع بعد الضغط على زرار الحذف
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {/* Cancel delete action */}
          <Button onClick={handleDeleteDialogClose}>إلغاء</Button>

          {/* Confirm delete action */}
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Modal */}

      {/* Start Edit Modal */}
      {/* Dialog for editing selected todo */}
      <Dialog
        sx={{ direction: "rtl" }} // Enable RTL layout for Arabic content
        open={showEditDialog} // Control dialog visibility
        onClose={handleEditDialogClose} // Close dialog handler
        aria-labelledby="alert-dialog-title" // Accessibility: dialog title reference
        aria-describedby="alert-dialog-description" // Accessibility: dialog description reference
      >
        {/* Edit dialog title */}
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>

        <DialogContent>
          {/* Input field for editing todo title */}
          <TextField
            autoFocus // Focus input when dialog opens
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editTodo.title} // Bind input to state
            onChange={
              (e) => setEditTodo({ ...editTodo, title: e.target.value }) // Update title in state
            }
          />

          {/* Input field for editing todo details */}
          <TextField
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={editTodo.details} // Bind input to state
            onChange={
              (e) => setEditTodo({ ...editTodo, details: e.target.value }) // Update details in state
            }
          />
        </DialogContent>

        <DialogActions>
          {/* Cancel edit action */}
          <Button onClick={handleEditDialogClose}>إلغاء</Button>

          {/* Confirm edit action */}
          <Button onClick={handleEditConfirm} autoFocus>
            نعم قم باتعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Modal */}
      {/* Main container for the todo app layout */}
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Card>
          <CardContent>
            {/* Application main title */}
            <Typography variant="h1">مهامى</Typography>
            <Divider />

            {/* Filter Toggle Buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }} // LTR for proper button alignment
              value={displayedTodosType} // Current active filter
              exclusive // Allow only one option at a time
              onChange={changeDisplayedType} // Handle filter change
              aria-label="text alignment"
            >
              {/* Show uncompleted todos */}
              <ToggleButton value="non-completed">غير منجز</ToggleButton>

              {/* Show completed todos */}
              <ToggleButton value="completed">المنجز</ToggleButton>

              {/* Show all todos */}
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/* Todos List Container */}
            <div
              style={{
                maxHeight: "300px", // Limit list height
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              {/* Render filtered todos */}
              {todosJsx}
            </div>

            {/* Inputs + Add Button */}
            <Grid container sx={{ marginTop: 3 }} spacing={2}>
              {/* Input fields section */}
              <Grid size={8} display="flex" flexDirection="column" gap={2}>
                {/* Todo title input */}
                <TextField
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput} // Bind title input to state
                  onChange={(e) => setTitleInput(e.target.value)} // Update title state
                  fullWidth
                />

                {/* Todo details input */}
                <TextField
                  label="تفاصيل المهمة"
                  variant="outlined"
                  value={detailsInput} // Bind details input to state
                  onChange={(e) => setDetailsInput(e.target.value)} // Update details state
                  fullWidth
                  multiline
                  rows={3} // Set textarea height
                />
              </Grid>

              {/* Add button section */}
              <Grid
                size={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {/* Submit new todo */}
                <Button
                  onClick={handleAddClick} // Handle add action
                  variant="contained"
                  sx={{ width: "100%", height: "60%" }}
                  disabled={titleInput.length == 0} // Prevent empty submissions
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
