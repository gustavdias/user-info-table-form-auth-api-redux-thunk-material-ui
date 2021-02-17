//! Loading & Error Handling
//* Make use of the Request/Success/Failure pattern to handle loading and error state
//* Separate action for Request, Success, and Failure

const initState = {
    items: [],//array of posts
    loading: false,
    error: null,
  };
  const userInfo = (state = initState, action) => {
    switch (action.type) {
      case "SIGN_UP_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "SIGN_UP_SUCCESS":
        return {
          ...state,
          loading: false,
          items: action.payload,
        };
      case "SIGN_UP_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.error,
          items: [],
        };
      default:
        return state;
    }
  };
  
  export default userInfo;