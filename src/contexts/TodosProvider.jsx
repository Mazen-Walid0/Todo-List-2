// Import React hook for managing complex state with reducer
import { useReducer } from "react";

// Import todos reducer logic
import TodosReducer from "../reducers/TodosReducer";

// Import todos context
import { TodosContext } from "./todosContext";

// Import UUID generator for unique todo IDs
import { v4 as uuidv4 } from "uuid";

// =======================
// Initial Todos Data
// =======================
const initialTodos = [
  {
    id: uuidv4(), // Generate unique ID
    title: "مذاكرة ريأكت",
    details: "مراجعة useState و useEffect وحل تمارين عليهم",
    isCompleted: false, // Task completion status
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "الذهاب للجيم",
    details: "تمرين صدر وذراع لمدة ساعة",
    isCompleted: false,
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "قراءة قرآن",
    details: "قراءة جزء واحد بعد الفجر",
    isCompleted: false,
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "تطبيق مشروع صغير بالـ HTML/CSS/JS",
    details: "إنشاء صفحة ويب بسيطة وتطبيق وظائف تفاعلية",
    isCompleted: false,
  },
  {
    id: uuidv4(), // Generate unique ID
    title: "ترتيب المكتب",
    details: "تنظيم مكان المذاكرة وتجهيز الأدوات",
    isCompleted: false,
  },
];

// Provider component for managing todos global state
const TodosProvider = ({ children }) => {
  // Initialize reducer with default todos
  const [todos, dispatch] = useReducer(
    TodosReducer,
    [...initialTodos], // Create a copy to prevent mutation
  );

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {/* Render wrapped application components */}
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
