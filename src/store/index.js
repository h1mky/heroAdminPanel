import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import heroes from "../reducers/heroes";
import filters from "../reducers/filter";

const stringMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === "string") {
    return dispatch({
      type: action,
    });
  }
  return dispatch(action);
};

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ heroes, filters }),
  composeEnhancers(applyMiddleware(thunk, stringMiddleware))
);

export default store;
