
import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
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
    const response = yield axios.post("/api/auth/signup", action.payload);
    yield put({ type: SIGNUP_SUCCESS, payload: response.data.user });
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: SIGNUP_FAILURE, payload: errorMsg });
  }
}

function* loginSaga(action) {
  try {
    const response = yield axios.post("/api/auth/login", action.payload);
    yield put({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    yield put({ type: LOGIN_FAILURE, payload: errorMsg });
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