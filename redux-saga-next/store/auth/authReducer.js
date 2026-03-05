import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_FAILURE, LOGIN_FAILURE } from "./authActions";

const initialState = {
  registeredUser: null,
  user: null,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGNUP_SUCCESS:
      return { ...state, registeredUser: action.payload, loading: false, error: null };

    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    case LOGOUT_REQUEST:
        return { ...state, loading: true, error: null }

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}