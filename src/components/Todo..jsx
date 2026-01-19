// Material Ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// End

import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
  }

  function handleEditConfirm() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: editTodo.title, details: editTodo.details }
        : t,
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditDialog(false);
  }

  function handleDeleteDialogOpen() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleEditDialogOpen() {
    setShowEditDialog(true);
  }
  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleCheckClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t,
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      {/* Start Delete Modal */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع بعد الضغط على زرار الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Modal */}
      {/* Start Edit Modal */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showEditDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={editTodo.details}
            onChange={(e) =>
              setEditTodo({ ...editTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>إلغاء</Button>
          <Button onClick={handleEditConfirm} autoFocus>
            نعم قم باتعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Modal */}
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted && "line-through",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted && "line-through",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/* Icons Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Start Check Icon Button */}
              <IconButton
                onClick={() => handleCheckClick()}
                className="iconButtons"
                aria-label="delete"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: `solid ${todo.isCompleted ? "white" : "#8bc34a"} 3px`,
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* End Check Icon Button */}
              <IconButton
                onClick={handleEditDialogOpen}
                className="iconButtons"
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteDialogOpen}
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
