import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import todoReducer from "./todos/todoReducer";
// import { todo } from "node:test";

export default combineReducers({
  todos: todoReducer,
  auth: authReducer,
});