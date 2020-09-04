import firebase from "firebase";
import { db } from "../config";

import {
  GET_USER_INFORMATION_SUCCESS,
  GET_USER_INFORMATION_ERROR
} from "./types";

export const getUserInformation = () => {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //NOTE: user gives the display name, email verified, etc...
        // console.log("user is sign in in profile actions; and user: " + JSON.stringify(user));
        // User is signed in.
        console.log("USER ID " + JSON.stringify(user.uid));
        var leadsRef = db.ref("users/" + user.uid + "/profile");
        leadsRef.on("value", function(snapshot) {
          var returnArr = [];
          //push snapshot vals to an array
          console.log(snapshot.val());
          snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
          });
          dispatch({
            type: GET_USER_INFORMATION_SUCCESS,
            userInformation: returnArr
          });
        });
      } else {
        // No user is signed in.
        dispatch({ type: GET_USER_INFORMATION_ERROR });
        console.log("error in getting user profile info in profile actions");
      }
    });
  };
};

//update then call get userinfo again
export const saveProfile = updatedInfo => {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //NOTE: user gives the display name, email verified, etc...
        // console.log("user is sign in in profile actions; and user: " + JSON.stringify(user));
        // User is signed in.

        console.log("updatedinfo" + typeof updatedInfo.firstName);
        var leadsRef = db.ref("users/" + user.uid + "/profile/");


        leadsRef.set(
          {
            age: updatedInfo.age,
            email: updatedInfo.email,
            fname: updatedInfo.firstName,
            lname: updatedInfo.lastName
          },
          function(error) {
            if (error) {
              // The write failed...
              //dispatch error
              console.log("userinfo update failed");
            } else {
              // Data saved successfully!
              //dispatch success - getUserinfoSuccess
              console.log("userinfo updated");
              // this.getUserInformation();
            }
          }
        );
      } else {
        // No user is signed in.
        dispatch({ type: GET_USER_INFORMATION_ERROR });
        console.log("error in UPDATING user profile info in profile actions");
      }
    });
  };
};
