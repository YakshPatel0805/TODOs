import { createSlice } from "@reduxjs/toolkit";

// TO_DO
const todoSlice = createSlice({
  name: "todo",
    initialState: {
    todos: [],
    error: null,
    loading: false,
  },
  reducers: {
    // fetch todos
    fetchTodosRequest: (state) => {
      state.loading = true
    },

    fetchTodosSuccess: (state, action) => {
      state.loading = false,
      state.todos = action.payload
    },

    fetchTodosFailure: (state, action) => {
      state.loading = false,
      state.error = action.payload
    },
    

    // add todo
    addtodosRequest: (state, action) => {
      state.todos.push(action.payload)
    },

    addTodosSuccess: (state, action) => {
      state.loading = false,
      state.todos = action.payload
    },

    addTodosFailure: (state, action) => {
      state.loading = false,
      state.error = action.payload
    },


    // delete todo
    deletetodoRequest: (state, action) => {
      state.todos = action.payload
    },

    deleteTodosSuccess: (state, action) => {
      state.loading = false,
      state.todos = action.payload
    },

    deleteTodosFailure: (state, action) => {
      state.loading = false,
      state.error = action.payload
    },


    // update todo
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id)
      state.todos[index] = action.payload
    }
  }
})

export const { fetchTodosRequest, fetchTodosFailure, fetchTodosSuccess, addtodosRequest, deleteTodosFailure, deleteTodosSuccess, deletetodoRequest, updateTodo } = todoSlice.actions

export default todoSlice.reducer
