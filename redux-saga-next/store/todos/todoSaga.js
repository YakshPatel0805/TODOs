// Create TODO
import { takeLatest, call, put } from "redux-saga/effects";
import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
    ADD_TODOS_FAILURE, ADD_TODOS_REQUEST, ADD_TODOS_SUCCESS, 
    DELETE_TODOS_REQUEST, DELETE_TODOS_SUCCESS, DELETE_TODOS_FAILURE,
    UPDATE_TODOS_REQUEST, UPDATE_TODOS_SUCCESS, UPDATE_TODOS_FAILURE,
    TOGGLE_TODOS_REQUEST, TOGGLE_TODOS_SUCCESS, TOGGLE_TODOS_FAILURE
} from "./todoActions";

// API Function for fetch todo
function fetchTodosAPI() {
    return fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((res) => res.json());
}

// API functions for Add todo
function addTodoApi(title) {
    return fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    }).then((res) => res.json());
}

// API function for delete todo
function deleteTodoApi(id) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
}

// API function for update todo
function updateTodoApi(id, title) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  }).then((res) => res.json());
}


// worker saga to fetch todos
function* fetchTodosSaga() {
    try {
        const todos = yield call(fetchTodosAPI);
        yield put({ type: FETCH_TODOS_SUCCESS, payload: todos });
    } catch (error) {
        yield put({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
}

// worker saga to add todos
function* addTodoSaga(action) {
    try {
        const newTodo = yield call(addTodoApi, action.payload);
        yield put({ type: ADD_TODOS_SUCCESS, payload: newTodo });
    } catch (error) {
        yield put({ type: ADD_TODOS_FAILURE, payload: error.message });
    }
}

// worker saga to delete todos
function* deleteTodoSaga(action) {
    try{
        yield call(deleteTodoApi, action.payload);
        yield put({ type: DELETE_TODOS_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: DELETE_TODOS_FAILURE, payload:error.message})
    }
}

// worker saga to update todos
function* updateTodoSaga(action) {
    try{
        // Extract the _key and title from payload
        const { _key, title } = action.payload;
        
        // For API calls, we need to find the original ID from the todo
        // Since we're using _key for local state management, we'll just update locally
        // without calling the API (or you can modify this to call API with a different approach)
        
        yield put({ 
          type: UPDATE_TODOS_SUCCESS, 
          payload: { _key, title } 
        });
    } catch (error) {
        yield put({ type: UPDATE_TODOS_FAILURE, payload: error.message });
    }
}

// worker saga to toggle todos
function* toggleTodoSaga(action) {
    try{
        // Toggle is a local operation, no API call needed
        yield put({ 
          type: TOGGLE_TODOS_SUCCESS, 
          payload: action.payload 
        });
    } catch (error) {
        yield put({ type: TOGGLE_TODOS_FAILURE, payload: error.message });
    }
}


// Watcher saga
export default function* todoSaga() {
    yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
    yield takeLatest(ADD_TODOS_REQUEST, addTodoSaga);
    yield takeLatest(DELETE_TODOS_REQUEST, deleteTodoSaga);
    yield takeLatest(UPDATE_TODOS_REQUEST, updateTodoSaga);
    yield takeLatest(TOGGLE_TODOS_REQUEST, toggleTodoSaga);
}
