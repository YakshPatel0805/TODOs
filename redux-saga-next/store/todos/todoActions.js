export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const fetchTodosRequest = (userId) => ({
  type: FETCH_TODOS_REQUEST,
  payload: userId,
});

export const createTodoRequest = (userId, todo) => ({
  type: CREATE_TODO_REQUEST,
  payload: { userId, todo },
});

export const updateTodoRequest = (title, userId, updates) => ({
  type: UPDATE_TODO_REQUEST,
  payload: { title, userId, updates },
});

export const deleteTodoRequest = (title, userId) => ({
  type: DELETE_TODO_REQUEST,
  payload: { title, userId },
});
