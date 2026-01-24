// Import UUID generator for creating unique todo IDs
import { v4 as uuidv4 } from "uuid";

// Reducer function to manage todos state
export default function TodosReducer(currentTodos, { type, payload }) {
  switch (type) {
    // Add a new todo
    case "added": {
      const newTodo = {
        id: uuidv4(), // Unique ID
        title: payload.titleInput, // Todo title
        details: payload.detailsInput, // Todo details
        isCompleted: false, // Default completion status
      };

      // Save updated todos to localStorage
      localStorage.setItem("todos", JSON.stringify([...currentTodos, newTodo]));

      // Return new state array
      return [...currentTodos, newTodo];
    }

    // Delete a todo
    case "deleted": {
      const updatedTodos = currentTodos.filter((t) => t.id !== payload.id);

      // Update localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    // Edit an existing todo
    case "edit": {
      const updatedTodos = currentTodos.map((t) =>
        t.id === payload.dialogTodo.id
          ? {
              ...t,
              title: payload.editTodo.title, // Update title
              details: payload.editTodo.details, // Update details
            }
          : t,
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    // Load all todos from localStorage
    case "getAllTodos": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [
        ...currentTodos,
      ];

      // Sync localStorage with state
      localStorage.setItem("todos", JSON.stringify(storageTodos));

      return storageTodos;
    }

    // Toggle completion status of a todo
    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((t) =>
        t.id === payload.id ? { ...t, isCompleted: !t.isCompleted } : t,
      );

      // Update localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    // Default: return current state
    default:
      return currentTodos;
  }
}
