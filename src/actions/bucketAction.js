import {
  //ITEM_ADDED,
  //GET_ALL_ITEMS,
  //UPDATE_ITEM,
  ADD_ITEM_ERROR,
  //ADD_ITEM_SUCCESS,
  DISPLAY_ITEMS,
  DELETE_ITEM
} from "./types";

import firebase from "firebase";
import { db } from "../config";
import { ThunkMiddleware } from "redux-thunk";



export const addToBucketList = itemObject => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    if (userId) {
      db.ref("/users/" + userId + "/bucketlist/")
        .push({
          item: itemObject.text,
          isCompleted: false
        })
        .then(() => {
          //dispatch({ type: ADD_ITEM_SUCCESS, ItemtoAdd: itemObject.text });
          dispatch(displayList());
          //dispatch({ type: ADD_ITEM_SUCCESS, ItemtoAdd: itemObject.text  });
        })
        .catch(err => {
          //console.log(err);

          dispatch({ type: ADD_ITEM_ERROR, err });
        });
    }
  };
};

export const initializeBucketList = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    //console.log(itemObject.text);
    if (userId) {
      db.ref("/users/" + userId + "/bucketlist/")
        .push({
          item: "",
          isCompleted: "N/A"
        })
        .then(() => {
          dispatch(displayList());
          //dispatch({ type: ADD_ITEM_SUCCESS, ItemtoAdd: itemObject.text  });
        })
        .catch(err => {
          //console.log(err);

          dispatch({ type: ADD_ITEM_ERROR, err });
        });
    }
  };
};

export const deleteFromList = delKey => {
  //console.log("in delete:" + delKey);
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    if (userId) {
      db.ref("users/" + userId + "/bucketlist/" + delKey)
        .remove()
        .then(() => {
          dispatch(displayList());
        });
    }
    dispatch({ type: DELETE_ITEM });
  };
};

export const updateItem = itemState => {
  //console.log("in updateItem")
  let itemKey = itemState.keyValue;
  let newItemValue = itemState.itemValue;
  //console.log(itemKey)
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    if (userId) {
      let itemRef = db.ref("users/" + userId + "/bucketlist");
      itemRef
        .child(itemKey)
        .update({ item: newItemValue })
        .then(() => {
          dispatch(displayList());
        });
    }
  };
};

export const markCompleted = completedKey => {
  console.log(JSON.stringify(completedKey));
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    if (userId) {
      let itemRef = db.ref("users/" + userId + "/bucketlist");
      itemRef
        .child(completedKey)
        .update({ isCompleted: "true" })
        .then(() => {
          dispatch(displayList());
        });
    }
  };
};

export const displayList = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    let itemsInList = [];
    //var listEmpty = "false";
    if (userId) {
      db.ref("users/" + userId).once("value", function(snapshot) {
        if (!snapshot.hasChild("bucketlist")) {
          //console.log("no items")
          //listEmpty = "true";
        }
      });
      //console.log("ij" + listEmpty);
      //console.log(userId)
      db.ref("users/" + userId + "/bucketlist").on("value", function(snapshot) {
        //  console.log("in snapshot")
        var listData = snapshot.val();
        var keys = Object.keys(listData);
        for (const eachItem of Object.entries(listData)) {
          console.log("trying tfind what this is " + eachItem);
          if (eachItem[1].isCompleted == false) {
            itemsInList.push({ eachItem });
          }
        }
      });
      //}
      //console.log("itemsInList:" + JSON.stringify(itemsInList));
      dispatch({ type: DISPLAY_ITEMS, personData: itemsInList });
    }
  };
};
