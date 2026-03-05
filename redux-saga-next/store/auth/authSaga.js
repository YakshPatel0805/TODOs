
import { takeLatest, put, select } from "redux-saga/effects";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./authActions";

function* signupSaga(action) {
  try {
    // fake API
    yield put({ type: SIGNUP_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, payload: error.message });
  }
}

function* loginSaga(action) {
  try {
    // Get the registered user from state
    const state = yield select();
    const registeredUser = state.auth.registeredUser;
    
    // Check if user is registered and credentials match
    if (registeredUser && 
        registeredUser.email === action.payload.email && 
        registeredUser.password === action.payload.password) {
      // Login successful
      yield put({ type: LOGIN_SUCCESS, payload: action.payload });
    } else {
      // Dispatch failure action instead of alert
      yield put({ type: LOGIN_FAILURE, payload: "Invalid credentials or user not registered. Please sign up first." });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* logoutSaga(action){
    // Clear localStorage on logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("reduxState");
    }
    yield put({ type: LOGOUT_SUCCESS, payload: action.payload });
}

export default function* authSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}