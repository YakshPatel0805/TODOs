import { all } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import todoSaga from "./todos/todoSaga";

export default function* rootSaga() {
  yield all([authSaga(), todoSaga()]);
}