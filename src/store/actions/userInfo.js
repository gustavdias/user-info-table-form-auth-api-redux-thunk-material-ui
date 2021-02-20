import Axios from "axios";

//! Loading & Error Handling
//* Make use of the Request/Success/Failure pattern to handle loading and error state
//* Separate action for Request, Success, and Failure

export const fetchPosts = () => {

  const jphUrl = "https://jsonplaceholder.typicode.com/posts";
  const firebaseUrl = "https://user-info-table-form-auth-default-rtdb.europe-west1.firebasedatabase.app/";
    //return function that you can pass 2 properties
    return async (dispatch, getState) => {
      dispatch({ type: "FETCH_POTS_REQUEST" });
  
      try {
        const response = await Axios.get(
          jphUrl
        ); //with async await you can be returning something that is not an object ot a function, but redux and react only cares about what the actionCreators returns,which is the outer function!!!
        //you need to dispatch the action manually (because we kind of pause the app)
        console.log("response.data: " , response.data);
  
        dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_POSTS_ERROR", error: error });
      }
  
      //dispatch({ type: "FETCH_POSTS", error: error }); //pass the action object that you want to dispatch
      //this dispatch is the function that redux-thunk allows you to return
    };
  };
  