import styles from "../StyleSheet";
import React from "react";
import { Container, View, Text, TouchableOpacity } from "react-native";
import RecCard from "../components/RecommendationCard";
import firebase from "firebase";
import { db } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { displayList } from "../actions/bucketAction";
import { wishlistToList, getWishList } from "../actions/wishlistAction";
import { Button, Icon } from "react-native-elements";

class InAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personData: [],
      wishlist: [],
      viewableWishList: []
    };
  }

  componentDidMount() {
    this.props.getWishList(this.state);
    // console.log("In component mount");
    // console.log(this.props.wishlist);
    this.props.wishlistToList(this.props.wishlist);
    // this.props.removeFromWishlist("nki4nr43");
  }

  onRefresh() {
    this.props.getWishList(this.state);
  }

  render() {
    return (
      // <View style={{ flex: 1 }}>
      <View style={styles.wishlistContainer}>
        <ScrollView>
          {/* <View style={styles.listContainer}> */}
          {this.props.viewableWishList}
          {/* </View> */}
        </ScrollView>

        <TouchableOpacity
          style={styles.refreshButton}
          accessible={true}
          testID="refreshWishListBtnInAction"
          accessibilityLabel="refreshWishListBtnInAction"
          title="Refresh Wishlist"
          onPress={() => {
            this.onRefresh();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Refresh Wishlist
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wishlist !== this.props.wishlist) {
      this.props.wishlistToList(this.props.wishlist);
    }
    //this.props.wishlist === undefined ? this.props.getWishList() : this.state.wishlist = this.props.wishlist
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.wishlist,
    viewableWishList: state.wishlist.viewableWishList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWishList: query => dispatch(getWishList(query)),
    wishlistToList: wishlist => dispatch(wishlistToList(wishlist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InAction);
