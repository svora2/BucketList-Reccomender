import {
  GET_WISHLIST,
  WISHLIST_TO_LIST,
  WISHLIST_ERROR,
  WISHLIST_DELETE_ERROR,
  WISHLIST_DELETE_SUCCESS
} from "./types";
import styles from "../StyleSheet";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";
import { Row } from "react-native-easy-grid";
import firebase from "firebase";
import { db } from "../config";
import RecCard from "../components/RecommendationCard";
import { getMemories } from "./myMemoriesAction";

export const getWishList = query => {
  return async (dispatch, getState) => {
    try {
      let wishlist = [];

      const userId = firebase.auth().currentUser.uid;

      let wishPath = db.ref("/users/" + userId + "/wishlist/"); // get reference of firebase
      wishPath.on("value", function(snapshot) {
        // get wishlist from the firebase database
        var listData = snapshot.val();

        if (
          listData !== null ||
          listData !== undefined ||
          listData.length !== 0
        ) {
          for (const eachWish of Object.entries(listData)) {
            // console.log("each ITEM IN THE " + JSON.stringify(eachWish));
            wishlist.push({
              item: eachWish
            });
            wishlist.push({ isCompleted: false });
          }
        }
        //console.log("wishlist in getWishList: " + JSON.stringify(wishlist))
        dispatch({ type: GET_WISHLIST, wishlist: wishlist });
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: WISHLIST_ERROR, err });
    }
  };
};
//wishlist display method
export const wishlistToList = wishlist => {
  return (dispatch, getState) => {
    try {
      var viewableWishList;
      const userId = firebase.auth().currentUser.uid;
      const ref = "/users/" + userId + "/mymemories/";

      db.ref("users/" + userId).once("value", function(snapshot) {
        if (!snapshot.hasChild("wishlist")) {
          console.log("No items");
        }
      });

      let currList = [];
      console.log("USER ID ========================================" + userId);
      db.ref("users/" + userId + "/wishlist").on("value", function(snapshot) {
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
          // console.log("EACH ITEM KEY IIN WISHLIST TO LIST METHOD" + JSON.stringify(eachItem))
          if (eachItem[1].isCompleted == false && existing == false) {
            currList.push(
              <View>
                <Text>
                  {console.log("bucketItem" + eachItem[1].bucketListItem)}
                </Text>
                <RecCard
                  activityName={eachItem[1].item.name}
                  bucketListItem={eachItem[1].bucketListItem}
                  key={eachItem[0]}
                />
                <View style={{ flexDirection: "row" }}>
                  {/* <TouchableOpacity
                    style={{
                      alignItems: "center",
                      backgroundColor: "#39ac96",
                      marginLeft: 15,
                      width: 285
                    }}
                    onPress={() => {
                      let currDate = getDate();
                      //   console.log(eachItem[1].item.name)
                      db.ref(ref).push({
                        item: eachItem[1].item,
                        isCompleted: false,
                        dateCompleted: currDate,
                        bucketListItem: eachItem[1].bucketListItem
                      });
                      //set the item in the wishlist to isCompleted = true
                      // let wishPath = db.ref("/users/" + userId + "/wishlist/" + eachItem[0]); // get reference of firebase
                      //remove the item from the wishlist
                      dispatch(removeFromWishlist(eachItem[0]));
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
                      Add to memories
                    </Text>
                  </TouchableOpacity> */}
                  <Button
                    buttonStyle={{
                      backgroundColor: "#a3cdd4",
                      alignItems: "center",
                      width: 175,
                      marginLeft: 15
                    }}
                    accessible={true}
                    testID="addToMemoriesWishList"
                   accessibilityLabel="addToMemoriesWishList"
                    icon={
                      <Icon
                        type="font-awesome"
                        name="check"
                        color="#ffffff"
                      ></Icon>
                    }
                    onPress={() => {
                      let currDate = getDate();
                      //   console.log(eachItem[1].item.name)
                      db.ref(ref).push({
                        item: eachItem[1].item,
                        isCompleted: false,
                        dateCompleted: currDate,
                        bucketListItem: eachItem[1].bucketListItem
                      });
                      dispatch(removeFromWishlist(eachItem[0]));
                    }}
                  ></Button>
                  <Button
                    buttonStyle={{
                      backgroundColor: "#dc3d31",
                      color: "#ffffff",
                      alignItems: "center",
                      width: 175,

                      marginRight: 15
                    }}
                    accessible={true}
                    testID={"deletefromWishlist"}
                    accessibilityLabel={"deletefromWishlist"}
                    icon={
                      <Icon
                        type="font-awesome"
                        name="trash"
                        color="#ffffff"
                      ></Icon>
                    }
                    onPress={() => dispatch(removeFromWishlist(eachItem[0]))}
                  ></Button>
                </View>
              </View>
            );
            prevList.push(eachItem[1].item.name);
          }
        }
      });

      viewableWishList = currList.map((item, key) => {
        return <View>{item}</View>;
      });
      dispatch({ type: WISHLIST_TO_LIST, viewableWishList });
    } catch (err) {
      console.error(err);
      dispatch({ type: WISHLIST_ERROR, err });
    }
  };
};

export const initalizeWishList = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;

    const ref = "/users/" + userId + "/wishlist/";
    // const ref2 = "/users/" + userId + "/mymemories/";

    // db.ref(ref).push("No Wishlist Items");
    // db.ref(ref2).push("No memories");
    if (userId) {
      db.ref("/users/" + userId + "/wishlist/")
        .push({
          item: "",
          isCompleted: "N/A"
        })
        .then(() => {
          dispatch(wishlistToList());
          //dispatch({ type: ADD_ITEM_SUCCESS, ItemtoAdd: itemObject.text  });
        })
        .catch(err => {
          //console.log(err);

          dispatch({ type: WISHLIST_ERROR, err });
        });
    }
  };
};

export const getDate = () => {
  let dateStr = "";
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  dateStr = month + "/" + date + "/" + year;
  return dateStr;
};

export const removeFromWishlist = delKey => {
  console.log("delete key in remove from memories 11111" + delKey);

  return (dispatch, getState) => {
    console.log("delete key in remove from memories 222222222" + delKey);

    const userId = firebase.auth().currentUser.uid;
    console.log("user id in remvoe MM" + userId);
    if (userId) {
      console.log("in remove MM");
      db.ref("users/" + userId + "/wishlist/" + delKey)
        .remove()
        .then(() => {
          dispatch(wishlistToList());
          dispatch(getMemories());
          dispatch({ type: WISHLIST_DELETE_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: WISHLIST_DELETE_ERROR, err });
        });
    }
  };
};
