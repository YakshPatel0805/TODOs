import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
} from './todoActions';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case UPDATE_TODO_REQUEST:
    case DELETE_TODO_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_TODO_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload, loading: false, error: null };

    case CREATE_TODO_SUCCESS:
      return { ...state, todos: [action.payload, ...state.todos], loading: false, error: null };

    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
        loading: false,
        error: null,
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        loading: false,
        error: null,
      };

    case FETCH_TODOS_FAILURE:
    case CREATE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
