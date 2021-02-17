import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import { signUpReducer } from "./reducers/signUp";
import { loginReducer } from "./reducers/login";
import { logoutReducer } from "./reducers/logout";
import signUpReducer from "./reducers/signUp"
import  userInfo  from "./reducers/userInfo";


import thunk from "redux-thunk";

const composeEnhancers =
  process.env.REACT_APP_NODE_ENVX === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

//combine reducers
const rootReducer = combineReducers({
  signUpReducer: signUpReducer,
  loginReducer: loginReducer,
  logoutReducer: logoutReducer,
});

const store = createStore(
  userInfo,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
