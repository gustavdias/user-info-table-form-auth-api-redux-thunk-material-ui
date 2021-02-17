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

//! Posting the data for auth on the server - firebase
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    //Web API Key
    const myWebAPIKey = "AIzaSyDFHy_UAYDMORaJzBQXigUSfXmOci7wJ0k";

    let signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${myWebAPIKey}`;
    // let signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${myWebAPIKey}`;

    let url = signUpUrl;
    // if (!isSignup) {
    //   url = signInUrl;
    // }
    axios
      .post(url, authData)
      .then((response) => {
        console.log("response from post: ", response);
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
