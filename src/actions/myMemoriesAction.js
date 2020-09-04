import {
  GET_MEMORIES,
  MEMORIES_TO_LIST,
  MEMORIES_ERROR,
  MEMORIES_DELETE_ERROR,
  MEMORIES_DELETE_SUCCESS
} from "./types";
import styles from "../StyleSheet";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";

import { Row } from "react-native-easy-grid";
import firebase from "firebase";
import { db } from "../config";
import RecCard from "../components/RecommendationCard";

export const getMemories = query => {
  return async (dispatch, getState) => {
    try {
      let memories = [];

      const userId = firebase.auth().currentUser.uid;

      let memPath = db.ref("/users/" + userId + "/mymemories/"); // get reference of firebase
      memPath.on("value", function(snapshot) {
        // get wishlist from the firebase database

        var listData = snapshot.val();

        if (
          listData !== null ||
          listData !== undefined ||
          listData.length !== 0
        ) {
          for (const eachMem of Object.entries(listData)) {
            memories.push({ eachMem });
          }
        }
        // console.log("memories in myMemAction: " + JSON.stringify(memories));
        dispatch({ type: GET_MEMORIES, memories: memories });
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: MEMORIES_ERROR, err });
    }
  };
};

export const memoriesToList = memories => {
  return (dispatch, getState) => {
    try {
      var viewableMemories;
      const userId = firebase.auth().currentUser.uid;

      db.ref("users/" + userId).once("value", function(snapshot) {
        if (!snapshot.hasChild("mymemories")) {
          console.log("No items");
        }
      });

      let currList = [];

      db.ref("users/" + userId + "/mymemories").on("value", function(snapshot) {
        //  console.log("in snapshot")
        var listData = snapshot.val();
        var keys = Object.keys(listData);
        let prevList = [];

        for (const eachItem of Object.entries(listData)) {
          var existing = false;
          for (var i = 0; i < prevList.length; i++) {
            if (
              prevList[i] != undefined &&
              prevList[i] != null &&
              prevList[i].length != 0
            ) {
              if (prevList[i] == eachItem[1].item.name) {
                existing = true;
              }
            }
          }

          if (eachItem[1].isCompleted == false && existing == false) {
            // console.log(JSON.stringify(eachItem));

            currList.push(
              <View>
                <RecCard
                  activityName={eachItem[1].item.name}
                  dateCompleted={eachItem[1].dateCompleted}
                  bucketListItem={eachItem[1].bucketListItem}
                />
                {/* <TouchableOpacity
                   style={{
                    alignItems: "center",
                    backgroundColor: "#dc3d31",
                    marginRight: 15,
                    marginLeft: 15,
                    width: 350
                  }}
                  onPress={() => {
                    //remove the item from the memories
                    dispatch(removeFromMemories(eachItem[0]));
                  }}
                >
                    <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  delete from memories
                </Text>
                </TouchableOpacity> */}
                <Button
                  buttonStyle={{
                    backgroundColor: "#dc3d31",
                    color: "#ffffff",
                    alignItems: "center",
                    width: 350,
                    marginLeft: 15,
                    marginRight: 15
                  }}
                  accessible={true}
                  testID={"deleteMemory"}
                  accessibilityLabel={"deleteMemory"}

                  icon={
                    <Icon
                      type="font-awesome"
                      name="trash"
                      color="#ffffff"
                    ></Icon>
                  }
                  onPress={() => dispatch(removeFromMemories(eachItem[0]))}
                ></Button>
              </View>
            );
            prevList.push(eachItem[1].item.name);
          }
        }
      });

      viewableMemories = currList.map((item, key) => {
        return <View style={styles.wishlistContainer}>{item}</View>;
      });
      dispatch({ type: MEMORIES_TO_LIST, viewableMemories });
    } catch (err) {
      console.error(err);
      dispatch({ type: MEMORIES_ERROR, err });
    }
  };
};

export const initializeMemories = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;

    const ref = "/users/" + userId + "/mymemories/";
    if (userId) {
      db.ref("/users/" + userId + "/mymemories/")
        .push({
          item: "",
          isCompleted: "N/A"
        })
        .then(() => {
          dispatch(memoriesToList());
          //dispatch({ type: ADD_ITEM_SUCCESS, ItemtoAdd: itemObject.text  });
        })
        .catch(err => {
          //console.log(err);

          dispatch({ type: MEMORIES_ERROR, err });
        });
    }
  };
};

export const removeFromMemories = delKey => {
  return (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    if (userId) {
      db.ref("users/" + userId + "/mymemories/" + delKey)
        .remove()
        .then(() => {
          dispatch(memoriesToList());
          dispatch({ type: MEMORIES_DELETE_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: MEMORIES_DELETE_ERROR, err });
        });
    }
  };
};
