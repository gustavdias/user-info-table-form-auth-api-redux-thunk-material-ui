import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import  loginReducer  from "./reducers/auth";
import  userInfo  from "./reducers/userInfo";


import thunk from "redux-thunk";

// const composeEnhancers =
//   process.env.REACT_APP_NODE_ENVX === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

//combine reducers
const rootReducer = combineReducers({
  loginReducer: loginReducer,
  // logoutReducer: logoutReducer,
});

// const store = createStore(
//   userInfo,
//   composeEnhancers(applyMiddleware(thunk))
// );
const store = createStore(
  userInfo,
  applyMiddleware(thunk)
);

export default store;
