export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const signupRequest = (data) => ({
  type: SIGNUP_REQUEST,
  payload: data,
});

export const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  payload: data,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = (data) => ({
  type: LOGOUT_REQUEST,
  payload: data,
})