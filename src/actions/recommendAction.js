import {
  GET_RECOMMENDATIONS,
  RECOMMENDATIONS_TO_LIST,
  RECOMMENDATIONS_ERROR
} from "./types";
import styles from "../StyleSheet";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";

import { Row } from "react-native-easy-grid";
import firebase from "firebase";
import { db } from "../config";
import RecCard from "../components/RecommendationCard";
import { getWishList, wishlistToList } from "../actions/wishlistAction";

const NUMBER_OF_RESULTS_LIMIT = 3;

export const getRecommendations = query => {
  return async (dispatch, getState) => {
    // API Query Setup
    var keywords = [];
    console.log("user busy in getRecommendations: " + query.userBusy)
    if ((query.personData === undefined) || (query.userBusy == true) ) {
      keywords = [];
    } else {
      for (var i = 0; i < query.personData.length; i++) {
       
        keywords.push(query.personData[i].eachItem[1].item);
      }
    }
    var apiURLs = key => {
      return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${query.currentRegion.latitude},${query.currentRegion.longitude}
        &radius=10000
        &keyword=${key}
        &key=AIzaSyBqh6uco7iZCh-FOBKWzPxxHAkTpBEtdFI`;
    };
    try {
      // API Query Defintion
      const apiQuery = async apiURL => {
        const result = await fetch(apiURL);
        const json = await result.json();
        return json;
      };
      // API Query Calls
      var queries = {
        results: [],
        bucketItem: []
      };
      for (var i = 0; i < keywords.length; i++) {
        var URL = apiURLs(keywords[i]);
        var returnVal = await apiQuery(URL);
        if (returnVal !== undefined && returnVal.length != 0) {
          var limit =
            returnVal.results.length < NUMBER_OF_RESULTS_LIMIT
              ? returnVal.results.length
              : NUMBER_OF_RESULTS_LIMIT;
          for (var j = 0; j < limit; j++) {
            queries.results = queries.results.concat(returnVal.results[j]);
            queries.bucketItem = queries.bucketItem.concat(keywords[i]);
            // console.log(JSON.stringify(queries));
          }
        }
      }
      var recommendations = queries;
      // Firebase Database Update
      const userId = firebase.auth().currentUser.uid;
      const ref = "/users/" + userId + "/recommended/";
      db.ref(ref).remove();
      db.ref(ref).push(recommendations);
      // Value Passed to Reducer (Local Database)
      dispatch({ type: GET_RECOMMENDATIONS, recommendList: recommendations });
    } catch (err) {
      // Error Handling
      console.error(err);
      dispatch({ type: RECOMMENDATIONS_ERROR, err });
    }
  };
};

export const recommendationsToList = recommendations => {
  return (dispatch, getState) => {
    try {
      var viewableList;
      if (
        recommendations === undefined ||
        recommendations.length == 0 ||
        recommendations.results.length == 0
      ) {
        viewableList = (
          <Row>
            <Text>No Recommendations at the moment</Text>
          </Row>
        );
      } else {
        const userId = firebase.auth().currentUser.uid;
        const ref = "/users/" + userId + "/wishlist/";

        viewableList = recommendations.results.map((item, index) => {
          var rating = "N/A"
          if(item.rating != null){
            rating = item.rating;
          }
          //console.log("bucket item: " + recommendations.bucketItem[index])
          return (
            <View>
              <RecCard
                activityName={item.name}
                rating={rating}
                address={item.vicinity}
                bucketListItem={recommendations.bucketItem[index]}
              />

              <Button
                buttonStyle={{
                  backgroundColor: "#39ac96",
                  alignItems: "center",
                  width: 350,
                  marginLeft: 15,
                  marginRight: 15
                }}
                accessible={true}
testID="addToWishListBtnHome"
                        accessibilityLabel="addToWishListBtnHome"

                icon={
                  <Icon type="font-awesome" name="heart" color="#ffffff"></Icon>
                }
                onPress={() => {
                  db.ref(ref).push({
                    item: item,
                    isCompleted: false,
                    bucketListItem: recommendations.bucketItem[index]
                  });

                  dispatch(getWishList());
                  dispatch(wishlistToList());
                }}
              ></Button>

              {/* <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#39ac96",
                  marginRight: 15,
                  marginLeft: 15,
                  width: 350
                }}
                onPress={() => {
                  db.ref(ref).push({
                    item: item,
                    isCompleted: false,
                    bucketListItem: recommendations.bucketItem[counter]
                  });

                  dispatch(getWishList());
                  dispatch(wishlistToList());
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
                  Add to Wish List
                </Text>
              </TouchableOpacity> */}
            </View>
          );
        });
      }
      dispatch({ type: RECOMMENDATIONS_TO_LIST, viewableList });
    } catch (err) {
      console.error(err);
      dispatch({ type: RECOMMENDATIONS_ERROR, err });
    }
  };
};
