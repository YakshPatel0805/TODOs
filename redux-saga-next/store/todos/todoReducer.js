import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODOS_FAILURE,
  ADD_TODOS_REQUEST,
  ADD_TODOS_SUCCESS,
  DELETE_TODOS_FAILURE,
  DELETE_TODOS_REQUEST,
  DELETE_TODOS_SUCCESS,
  UPDATE_TODOS_FAILURE,
  UPDATE_TODOS_REQUEST,
  UPDATE_TODOS_SUCCESS,
  TOGGLE_TODOS_REQUEST,
  TOGGLE_TODOS_SUCCESS,
  TOGGLE_TODOS_FAILURE
} from "./todoActions";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

// Helper function to generate unique key for each todo
const generateUniqueKey = () => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to ensure todo has valid unique key
const ensureTodoHasKey = (todo) => {
  if (!todo._key) {
    return { ...todo, _key: generateUniqueKey() };
  }
  return todo;
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true };

    case FETCH_TODOS_SUCCESS:
      // Ensure all fetched todos have unique keys
      const fetchedTodos = Array.isArray(action.payload) 
        ? action.payload.map(ensureTodoHasKey)
        : [];
      return { ...state, loading: false, todos: fetchedTodos };

    case FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_TODOS_REQUEST:
      return { ...state, loading: true };

    case ADD_TODOS_SUCCESS:
      // Ensure the new todo has a unique key
      const newTodo = ensureTodoHasKey(action.payload);
      return { ...state, loading: false, todos: [...state.todos, newTodo] }

    case  ADD_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_TODOS_REQUEST:
      return { ...state, loading: true };

    case DELETE_TODOS_SUCCESS:
      // Delete by comparing the unique key (passed as payload)
      const keyToDelete = action.payload;
      const filteredTodos = state.todos.filter((todo) => {
        return todo._key !== keyToDelete;
      });
      return {  
        ...state, 
        todos: filteredTodos, 
        loading: false
      }

    case  DELETE_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_TODOS_REQUEST:
      return { ...state, loading: true };

    case UPDATE_TODOS_SUCCESS:
      // Update by comparing the unique key
      const keyToUpdate = action.payload._key;
      const updatedTodos = state.todos.map((todo) => {
        if (todo._key === keyToUpdate) {
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        loading: false,
      };

    case  UPDATE_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case TOGGLE_TODOS_REQUEST:
      return { ...state, loading: true };

    case TOGGLE_TODOS_SUCCESS:
      // Toggle the completed status by comparing the unique key
      const keyToToggle = action.payload;
      const toggledTodos = state.todos.map((todo) => {
        if (todo._key === keyToToggle) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        ...state,
        todos: toggledTodos,
        loading: false,
      };

    case  TOGGLE_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}