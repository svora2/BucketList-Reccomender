import authReducer from "../reducers/authReducer";

const initialState = {
  email: "",
  password: "",
  isLogged: false,
  loginError: null,
  signupError: null,
  deleteError: null
};

test("Auth Reducer Test: LOGIN_ERROR ", () => {
  let action = {
    type: "LOGIN_ERROR",
    isLogged: false,
    err: {
      message: "Login failed"
    }
  };
  let modifiedState = {
    email: "",
    password: "",
    isLogged: false,
    loginError: "Login failed",
    signupError: null,
    deleteError: null
  };

  expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
});

test("Auth Reducer Test: LOGIN_SUCCESS ", () => {
  let action = {
    type: "LOGIN_SUCCESS",
    isLogged: true,

    loginError: null
  };
  let modifiedState = {
    email: "",
    password: "",
    isLogged: true,
    loginError: null,
    signupError: null,
    deleteError: null
  };

  expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
});


test("Auth Reducer Test: LOGOUT_SUCCESS ", () => {
    let action = {
      type: "LOGOUT_SUCCESS",
      isLogged: true,
      loginError: null
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: false,
      loginError: null,
      signupError: null,
      deleteError: null
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });
  
  test("Auth Reducer Test: SIGNUP_SUCCESS ", () => {
    let action = {
      type: "SIGNUP_SUCCESS",
      isLogged: true,
      loginError: null
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: true,
      loginError: null,
      signupError: null,
      deleteError: null
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });

    
  test("Auth Reducer Test: SIGNUP_ERROR ", () => {
    let action = {
      type: "SIGNUP_ERROR",
      isLogged: false,
      loginError: null,
      err: {
            message: "user signup error"
        }
    
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: false,
      loginError: null,
      signupError: "user signup error",
      deleteError: null
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });

  test("Auth Reducer Test: CLEAR_ERRORS ", () => {
    let action = {
      type: "CLEAR_ERRORS ",
      isLogged: false,
      loginError: null
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: false,
      loginError: null,
      signupError: null,
      deleteError: null
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });


  test("Auth Reducer Test: DELETE_SUCCESS ", () => {
    let action = {
      type: "DELETE_SUCCES",
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: false,
      loginError: null,
      signupError: null,
      deleteError: null
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });

  test("Auth Reducer Test: DELETE_ERROR ", () => {
    let action = {
      type: "DELETE_ERROR",
      err: {
          message: "user not deleted"
      }
    };
    let modifiedState = {
      email: "",
      password: "",
      isLogged: false,
      loginError: null,
      signupError: null,
      deleteError: "user not deleted"
    };
  
    expect(authReducer(undefined, action)).toStrictEqual(modifiedState);
  });