import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

//you get a token and an expirationDate to to see if it is still valid, if not I want to clean up the token with the logout dispatch action
export const logout = () => {
  //* access local storage and remove token and expirationDate + userId
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  //* I should check it when the application loads - on App.js - For checking this, we will need a new action: authSuccess(when user is logged in) and execute or dispatch checkAuthTimeout and pass the expiration in amount to still have that functionality going.
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

//! logout navbar when token expires
//* clicking on logout cleans the token and redirects
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    //run async code
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); //x1000 to turn milliseconds into seconds
  };
};

//! Posting the data for auth on the server - firebase
export const auth = (email, password, isSignup) => {
  console.log("auth before dispatch: ", email, password, isSignup);
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    // export const auth = (firstName, lastName, email, password, isSignup) => {
    //   return (dispatch) => {
    //     dispatch(authStart());
    //     const authData = {
    //       firstName:firstName,
    //       lastName:lastName,
    //       email: email,
    //       password: password,
    //       returnSecureToken: true,
    //     };

    //Web API Key
    const myWebAPIKey = "AIzaSyDFHy_UAYDMORaJzBQXigUSfXmOci7wJ0k";

    // ("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4v9xe--JQo625ueHyvbbUKWOKjOViuyc");
    // ("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4v9xe--JQo625ueHyvbbUKWOKjOViuyc");

    let signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${myWebAPIKey}`;
    let loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${myWebAPIKey}`;

    let url = loginUrl;
    if (!isSignup) {
      url = signUpUrl;
    }

    axios
      .post(url, authData)
      .then((response) => {
        console.log("!!!---response: ", response);
        console.log("--- post request on firebase: ", url, authData);
        //?Persistent Auth state with localStorage
        //! Volta!!!! Persistent Auth state with localStorage - local storage API is baked into the browser

        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000 //milliseconds into seconds
          //extract the current time and adds the 1h expiration time (3600*1000 )
          //*check expiration date on chrome application => local storage => localhost:3000
          //you get a token and an expirationDate to to see if it is still valid, if not I want to clean up the token with the logout dispatch action
        );
        localStorage.setItem("token", response.data.idToken); //token
        localStorage.setItem("expirationDate", expirationDate); //when it expires
        localStorage.setItem("userId", response.data.localId); //user id
        //?Persistent Auth state with localStorage

        // dispatch(authSuccess(response.data));
        //!storing the authentication status JWT = idToken and user = localId
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        //inspect the response to see how to extract the data I want to pass on to authSuccess

        //! logout navbar when token expires
        dispatch(checkAuthTimeout(response.data.expiresIn));
        //?Persistent Auth state with localStorage
        //* I should check it when the application loads - on App.js - For checking this, we will need a new action: authSuccess(when user is logged in) and execute or dispatch checkAuthTimeout and pass the expiration in amount to still have that functionality going.
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);

        //to store the error
        // dispatch(authFail(err));
        dispatch(authFail(err.response.data.error));
      });
  };
};
