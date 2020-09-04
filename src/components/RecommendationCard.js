import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SearchBar, Icon, Button, Card } from "react-native-elements";

import { tsPropertySignature } from "@babel/types";

const RecommendationCard = props => {
  return (
    <View>
      
      <Card title={props.bucketListItem}>
      
        <Text style={styles.cardTitleText}>{props.activityName}</Text>
        <Text style={styles.addressText}>{props.address}</Text>   
             
          {(props.rating != undefined) && (<Text style={styles.ratingText}>rating: {props.rating}/5</Text>)}
        {(props.dateCompleted != undefined) && (
          <Text style={styles.dateCompleted}>
            completed on: {props.dateCompleted}
          </Text>
        )}
        
      </Card>
    </View>
  );
};

const styles = {
  cardRow: {
    borderRadius: 10,
    backgroundColor: "#556954",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    marginVertical: 20
  },
  cardTitleText: {
    color: "#253446",
    alignItems: "center",
    fontSize: 18,
//     fontFamily: "Roboto",
    fontWeight: "bold",
    marginLeft: 15
  },

  cardNumText: {
    color: "white",
    fontSize: 25
  },

  ratingText: {
    color: "#253446",
    fontSize: 18,
//     fontFamily: "Roboto",
    fontWeight: "bold",
    marginLeft: 20,
    alignItems: "center"
  },

  addressText: {
    color: "#253446",
    fontSize: 18,
    alignItems: "center",
//     fontFamily: "Roboto",
    marginLeft: 20
  },
  dateCompleted: {
    color: "#253446",
    fontSize: 18,
//     fontFamily: "Roboto",
    // fontWeight: "bold",
    alignItems: "center",
    marginLeft: 20
  },

  activityCard: {
    borderRadius: 30,
    backgroundColor: "#f6f2f1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 105,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10
  }
};

export default RecommendationCard;
