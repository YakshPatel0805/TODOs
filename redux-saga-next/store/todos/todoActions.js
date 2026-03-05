export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODOS_REQUEST = "ADD_TODOS_REQUEST";
export const ADD_TODOS_SUCCESS = "ADD_TODOS_SUCCESS";
export const ADD_TODOS_FAILURE = "ADD_TODOS_FAILURE";

export const DELETE_TODOS_REQUEST = "DELETE_TODOS_REQUEST";
export const DELETE_TODOS_SUCCESS = "DELETE_TODOS_SUCCESS";
export const DELETE_TODOS_FAILURE = "DELETE_TODOS_FAILURE";

export const UPDATE_TODOS_REQUEST = "UPDATE_TODOS_REQUEST";
export const UPDATE_TODOS_SUCCESS = "UPDATE_TODOS_SUCCESS";
export const UPDATE_TODOS_FAILURE = "UPDATE_TODOS_FAILURE";

export const TOGGLE_TODOS_REQUEST = "TOGGLE_TODOS_REQUEST";
export const TOGGLE_TODOS_SUCCESS = "TOGGLE_TODOS_SUCCESS";
export const TOGGLE_TODOS_FAILURE = "TOGGLE_TODOS_FAILURE";


// fetch todo
export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess =(todos) => ({
    type: FETCH_TODOS_SUCCESS,
    payload: todos,
})

export const fetchTodosFailure = (error) => ({
    type: FETCH_TODOS_FAILURE,
    payload: error,
});


// add todo
export const addtodosRequest = (title) => ({
  type: ADD_TODOS_REQUEST,
  payload: title,
})

export const addtodosSuccess = (todos) => ({
  type: ADD_TODOS_SUCCESS, 
  payload: todos,
});

export const addtodosFailure = (error) => ({
  type: ADD_TODOS_FAILURE,
  payload: error,
});


// delete todo
export const deletetodosRequest = (id) => ({
  type: DELETE_TODOS_REQUEST,
  payload: id,
})

export const deletetodosSuccess = (id) => ({
  type: DELETE_TODOS_SUCCESS, 
  payload: id,
});

export const deletetodosFailure = (error) => ({
  type: DELETE_TODOS_FAILURE,
  payload: error,
});


// update todo
export const updatetodoRequest = (key, title) => ({
  type: UPDATE_TODOS_REQUEST,
  payload: { _key: key, title },
});

export const updatetodosSuccess = (key, title) => ({
  type: UPDATE_TODOS_SUCCESS, 
  payload: { _key: key, title },
});

export const updatetodosFailure = (error) => ({
  type: UPDATE_TODOS_FAILURE,
  payload: error,
});

// toggle todo
export const toggletodoRequest = (key) => ({
  type: TOGGLE_TODOS_REQUEST,
  payload: key,
});

export const toggletodoSuccess = (key) => ({
  type: TOGGLE_TODOS_SUCCESS, 
  payload: key,
});

export const toggletodoFailure = (error) => ({
  type: TOGGLE_TODOS_FAILURE,
  payload: error,
});