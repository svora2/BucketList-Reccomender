import profileReducer from "../reducers/profileReducer";

const initialState = {
  email: "",
  fName: "",
  lName: "",
  age: 0,
  err: null
};

test("Profile Reducer Test: GET_USER_INFORMATION_SUCCESS ", () => {
  let action = {
    type: "GET_USER_INFORMATION_SUCCESS",
    userInformation: [10, "email@gmail.com", "Jane", "Doe"],

    err: ""
  };
  let modifiedState = {
    ...initialState,
    email: "email@gmail.com",
    fName: "Jane",
    lName: "Doe",
    age: 10,
    err: ""
  };

  expect(profileReducer(undefined, action)).toStrictEqual(modifiedState);
});

test("Profile Reducer Test: GET_USER_INFORMATION_ERROR ", () => {
  let action = {
    type: "GET_USER_INFORMATION_ERROR",
    error: "ERROR: Failed to get user profile information"
  };
  let modifiedState = {
    ...initialState,
    err: null,
    error: "ERROR: Failed to get user profile information"
  };

  expect(profileReducer(undefined, action)).toStrictEqual(modifiedState);
});