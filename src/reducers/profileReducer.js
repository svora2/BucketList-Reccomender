const initialState = {
    email: "",
    fName: "",
    lName: "",
    age: 0,
    err: null
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER_INFORMATION_SUCCESS":
        return {
          ...state,
          email: action.userInformation[1],
          fName: action.userInformation[2],
          lName: action.userInformation[3],
          age: action.userInformation[0],
          err: ""
        };
  
      case "GET_USER_INFORMATION_ERROR":
        return {
          ...state,
          error: "ERROR: Failed to get user profile information"
        };
  
      default:
        return state;
    }
  };
  
  export default profileReducer;
  