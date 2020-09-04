import styles from "../StyleSheet";
import React from "react";
import { Container, View, Text, TouchableOpacity } from "react-native";
import RecCard from "../components/RecommendationCard";
import firebase from "firebase";
import { db } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { memoriesToList, getMemories } from "../actions/myMemoriesAction";
import { Button, Icon } from "react-native-elements";

class Memories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personData: [],
      memories: [],
      viewableMemories: []
    };
  }

  componentDidMount() {
    this.props.getMemories(this.state);
    this.props.memoriesToList(this.props.memories);
  }

  onRefresh() {
    this.props.getMemories(this.state);
  }

  render() {
    return (
      <View style={styles.wishlistContainer}>
        <ScrollView>
          <View>{this.props.viewableMemories}</View>
        </ScrollView>
        <TouchableOpacity
          style={styles.refreshButton}
          accessible={true}
          testID="refreshMemoriesBtn"
          accessibilityLabel="refreshMemoriesBtn"
          title="Refresh Memories"
          onPress={() => {
            this.onRefresh();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>	      
            Refresh Memories	   
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.memories !== this.props.memories) {
      this.props.memoriesToList(this.props.memories);
    }
    //this.props.wishlist === undefined ? this.props.getWishList() : this.state.wishlist = this.props.wishlist
  }
}

const mapStateToProps = state => {
  return {
    memories: state.memories.memories,
    viewableMemories: state.memories.viewableMemories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMemories: query => dispatch(getMemories(query)),
    memoriesToList: memories => dispatch(memoriesToList(memories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memories);
