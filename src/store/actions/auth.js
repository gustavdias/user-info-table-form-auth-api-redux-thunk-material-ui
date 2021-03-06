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



//https://firebase.google.com/docs/reference/rest/auth/
// email	string	The email the user is signing in with.
// password	string	The password for the account.
// returnSecureToken	boolean	Whether or not to return an ID and refresh token. Should always be true.

//* answer from the server:
// data:
// displayName: ""
// email: "test@test.com"
// expiresIn: "3600" = 1h
//! idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjMmVkODQ5YThkZTI3ZTI0NjFlNGJjM2VmMDZhYzdhYjc4OGQyMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2QtYnVyZ2VyLWJ1aWxkZXItcmVhY3QtYXBwIiwiYXVkIjoiZ2QtYnVyZ2VyLWJ1aWxkZXItcmVhY3QtYXBwIiwiYXV0aF90aW1lIjoxNjEyNDUwMDQwLCJ1c2VyX2lkIjoiNXdrVXJFMzI0RGRGcHJ0RGN6bFA0S0dCamI2MiIsInN1YiI6IjV3a1VyRTMyNERkRnBydERjemxQNEtHQmpiNjIiLCJpYXQiOjE2MTI0NTAwNDAsImV4cCI6MTYxMjQ1MzY0MCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Lb9epxTQ1OA-DyjvHdrGKcMHoAkjdOCzeE0dFqRzibsQenbWR82ZByjfCr0BwrAphSK-GBe-YqhyFcAM9tKhlcbM8Po1d3X81zUp_CYYvNEMKsppXU1JvN-WFBkbOz-FnZajosl_yo7NyaGaFZUR6KFmc1akbKWrTIG7Q5fjZ3I-rnFaAsAl3Rgm28MI77jmlMXJcm-h3ICQXbGjI8MQ575H2qszPaD_hqftCwqm6HSr2_M3EgbniVBrcGHLncKAe60n529iBqOX6i5xdhtlquHgbZbSxA9Hp5q0RgUXP2ny62HEwyA9nNxeqYx6ZOt3ylcZRq4cpkSdci-gYf36YA"
//* idToken can be decrypted into JS object
// kind: "identitytoolkit#VerifyPasswordResponse"
//! localId: "5wkUrE324DdFprtDczlP4KGBjb62" - it is the user id
// refreshToken: "AOvuKvQI6IIYWrBqexb5PONfeb0mnOZr5diTaAEXoexWVhf6l0evDEXjlPcBMit2jBL3yDdzZWw4V3_OSiKakc4i-w405pp6qQ--LTp-IB9-E79eO7iNPH5EeWsVimyl9K2KAvenqc-ObY2SIAN0RwfFC-WVJwiDgC-ED0tN6QOjIRQs7poZt5h6G8JOAteyXcRItkomVXxx9A08HCYRh_PGdTHlMqPOsIXedzBm6g7xblXqgssTCNI"
//* refreshToken is used to generate a new idToken - only you and your application can do that - refreshing the token won't be used here, this is something you would have to do if you want to ensure that tokens don't expire after 1 hour.
// registered: true

//* redirect path from BurgerBuilder - this.props.history.push('/auth');
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};




//?Persistent Auth state with localStorage
//* I should check it when the application loads - on App.js - 
//For checking this, we will need a new action: authSuccess(when user is logged in) and execute or dispatch checkAuthTimeout and pass the expiration in amount to still have that functionality going.
// dispatch authCheckState to successfully automatically log the user in if we have a valid token.
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
            //*amounts of seconds, the amount of seconds until the user should be logged out,
          )
        );
      }
    }
  };
};
