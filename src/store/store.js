import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import  authReducer  from "./reducers/auth";
import  userInfo  from "./reducers/userInfo";


import thunk from "redux-thunk";

// const composeEnhancers =
//   process.env.REACT_APP_NODE_ENVX === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

//combine reducers
const rootReducer = combineReducers({
  authReducer: authReducer,
  userInfo: userInfo,
});

// const store = createStore(
//   userInfo,
//   composeEnhancers(applyMiddleware(thunk))
// );
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
