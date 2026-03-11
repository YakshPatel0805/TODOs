import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
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

function* fetchTodosSaga(action) {
  try {
    console.log('Fetching todos for userId:', action.payload);
    const response = yield axios.get(`/api/todos?userId=${action.payload}`);
    console.log('Todos fetched:', response.data);
    yield put({ type: FETCH_TODOS_SUCCESS, payload: response.data.todos });
  } catch (error) {
    console.error('Fetch todos error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: FETCH_TODOS_FAILURE, payload: errorMsg });
  }
}

function* createTodoSaga(action) {
  try {
    const { userId, todo } = action.payload;
    console.log('Creating todo:', { userId, todo });
    const response = yield axios.post(`/api/todos?userId=${userId}`, todo);
    console.log('Todo created:', response.data);
    yield put({ type: CREATE_TODO_SUCCESS, payload: response.data.todo });
  } catch (error) {
    console.error('Create todo error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: CREATE_TODO_FAILURE, payload: errorMsg });
  }
}

function* updateTodoSaga(action) {
  try {
    const { title, userId, updates } = action.payload;
    console.log('Update saga:', { title, userId, updates });
    const response = yield axios.put(`/api/todos?title=${encodeURIComponent(title)}&userId=${userId}`, updates);
    console.log('Todo updated response:', response.data);
    yield put({ type: UPDATE_TODO_SUCCESS, payload: response.data.todo });
  } catch (error) {
    console.error('Update todo error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: UPDATE_TODO_FAILURE, payload: errorMsg });
  }
}

function* deleteTodoSaga(action) {
  try {
    const { title, userId } = action.payload;
    console.log('Delete saga:', { title, userId });
    const response = yield axios.delete(`/api/todos?title=${encodeURIComponent(title)}&userId=${userId}`);
    console.log('Todo deleted response:', response.data);
    if (response.data.todo && response.data.todo._id) {
      yield put({ type: DELETE_TODO_SUCCESS, payload: response.data.todo._id });
    } else {
      console.error('No todo ID in response:', response.data);
      yield put({ type: DELETE_TODO_FAILURE, payload: 'Failed to delete todo' });
    }
  } catch (error) {
    console.error('Delete todo error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: DELETE_TODO_FAILURE, payload: errorMsg });
  }
}

export default function* todoSaga() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeLatest(CREATE_TODO_REQUEST, createTodoSaga);
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
}
