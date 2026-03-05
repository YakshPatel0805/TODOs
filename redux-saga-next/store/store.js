import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  // Save state to localStorage after every action (only on client)
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("reduxState", JSON.stringify(store.getState()));
    }
  } catch (e) {
    console.error("Failed to save state:", e);
  }
  return result;
};

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  // Load persisted state from localStorage (only on client)
  let preloadedState = undefined;
  try {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("reduxState");
      if (savedState) {
        preloadedState = JSON.parse(savedState);
      }
    }
  } catch (e) {
    console.error("Failed to load state:", e);
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, persistMiddleware),
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const store = makeStore();