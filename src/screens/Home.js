import React from "react";
import firebase from "firebase";
import styles from "../StyleSheet";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Button, Icon, SearchBar } from "react-native-elements";

import {getUserAvailability} from "../actions/calendarAction"
import { displayList } from "../actions/bucketAction";
import { getSearchList } from "../actions/searchAction";
import { getCurrentLocation } from "../actions/locationAction";
import { getRecommendations, recommendationsToList } from "../actions/recommendAction";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRegion: {
        latitude: 42.882004,
        longitude: 74.582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      userBusy: false,
      bucketList: [],
      recommendList: [],
      viewableList: [],
      personData: [],
      display: [],
      currItem: [],
      search: '',
      searchList: [],

    };
  }

  componentDidMount() {
    this.props.getCurrentLocation();
    this.props.displayList();
  }

  /* getUserAvailability = (userEventsObject) => {
    //getuserAvailability
    const NUM_HRS_AVAILABILITY = 2;
    //get current time and date
    var currDate = new Date();
   // this.getDatefromString.bind(this, currDate);
    var dateToday = currDate.toISOString().split('T')[0];
    var timeNow = currDate.toLocaleTimeString('en-GB');
    currDate.setHours(currDate.getHours() + NUM_HRS_AVAILABILITY);
    var timeAfter2hrs = currDate.toLocaleTimeString('en-GB');
    //console.log("currTime: " + currTime + "time after 2 hrs: " + timeAfter2hrs)
    //check if busy in the next two hours  
    let isBusy = false; 
    let todaysEvents = userEventsObject[dateToday]
    let numEvents = todaysEvents.length;
    if(todaysEvents != undefined){
      //console.log("event start time: " + todaysEvents[numEvents - 1].startTime + " currTime: " + currTime + " timeAfter2rs: " + timeAfter2hrs)  
      while((!isBusy) && (numEvents > 0)){
        var currEventStartTime = todaysEvents[numEvents - 1].startTime;
        var currEventEndTime = todaysEvents[numEvents - 1].endTime;
        if( ((currEventStartTime > timeNow) && (currEventStartTime < timeAfter2hrs)) || (( currEventEndTime > timeNow ) && (currEventEndTime < timeAfter2hrs ))
              ) {
            console.log("busy in the next 2 hrs");
            isBusy = true;
        };
        numEvents--;
      }  
     // console.log("todaysEvents: " + JSON.stringify(todaysEvents));
    }
    //generate recommendations if not busy
    if(!isBusy){
      console.log("can generate recommendations")
    }
} */
userAvailability = (userEventsObject) => {
  
          //getuserAvailability
          console.log("here in user availability function")
          const NUM_HRS_AVAILABILITY = 2;
          //get current time and date
          var currDate = new Date();
         // this.getDatefromString.bind(this, currDate);
          var dateToday = currDate.toISOString().split('T')[0];
          var timeNow = currDate.toLocaleTimeString('en-GB');
          currDate.setHours(currDate.getHours() + NUM_HRS_AVAILABILITY);
          var timeAfter2hrs = currDate.toLocaleTimeString('en-GB');
          //console.log("dateToday: " + dateToday +  " currTime: " + timeNow + "time after 2 hrs: " + timeAfter2hrs)

          //check if busy in the next two hours  
          let isBusy = false; 
          let todaysEvents = userEventsObject[dateToday]
          if(todaysEvents != undefined){
            let numEvents = todaysEvents.length;
            //console.log("event start time: " + todaysEvents[numEvents - 1].startTime + " currTime: " + currTime + " timeAfter2rs: " + timeAfter2hrs)  
            while((!isBusy) && (numEvents > 0)){
              var currEventStartTime = todaysEvents[numEvents - 1].startTime;
              var currEventEndTime = todaysEvents[numEvents - 1].endTime;
              if( ((currEventStartTime > timeNow) && (currEventStartTime < timeAfter2hrs)) || (( currEventEndTime > timeNow ) && (currEventEndTime < timeAfter2hrs ))
                    ) {
                  //console.log("busy in the next 2 hrs");
                  isBusy = true;
              };
              numEvents--;
            }  
           // console.log("todaysEvents: " + JSON.stringify(todaysEvents));
          }
          this.setState({userBusy: isBusy})
          //generate recommendations if not busy


          //console.log("isBusy in function: " + isBusy)
          return isBusy;

  

} ;
  onRecommendations = () => {
    this.state.personData = this.props.personData;
    console.log("in onRecommendations")

    if(this.props.calendarAccessPermission){
      //console.log("permission to access calendar")
      //console.log("calendar events in home: " + JSON.stringify(this.props.userEventsinCalendar));
      let userisBusy = this.userAvailability(this.props.userEventsinCalendar)
      //console.log("userBusy in home screen: " + this.props.userBusy)
      //console.log("var userisBusy in home: " + userisBusy)
      // if(userisBusy){
        
      // }
      // else{
      //   //console.log("not busy")
      //   this.props.getRecommendations(this.state);
      // }

      this.props.getRecommendations(this.state);
    }
    else{
    this.props.getRecommendations(this.state);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        
        <SearchBar
        accessible={true}
        testID="searchListHome"
        accessibilityLabel="searchListHome"
        placeholder="Type Here..."
        onChangeText={this.props.getSearchList}
        value={this.props.search}
        />
 <View style={{ flexDirection: "row" }}>
<TouchableOpacity
          accessible={true}
          testID="toCustomLocation"
          accessibilityLabel="toCustomLocation"
            style={styles.locationButton}
            onPress={() => {
              this.props.navigation.navigate("CustomLocation");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                alignSelf: "center"
              }}
            >
              Use Current Location or Enter
            </Text>
          </TouchableOpacity>

          <Button
            type="outline"
            buttonStyle={{
              borderRadius: 50,
              width: 45,
              height: 45,
              marginLeft: 20,
              marginTop: 10,
              backgroundColor: "#a3cdd4"
            }}
            accessible={true}
            testID="profileHome"
            accessibilityLabel="profileHome"
            icon={
              <Icon
                type="font-awesome"
                name="user"
                color="#ffffff"
                style={{ fontSize: 10, fontWeight: "100" }}
              ></Icon>
            }
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          ></Button>
</View>
        <ScrollView>
          <View style={styles.listContainer}>
            {this.props.viewableList}
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if(prevProps.recommendList !== this.props.recommendList){
      this.props.recommendationsToList(this.props.recommendList);
    }
    if(this.props.search.length != 0 && prevProps.search !== this.props.search){
      this.props.recommendationsToList(this.props.searchList);
    }
    else if(this.props.search.length == 0 && prevProps.search !== this.props.search){
      this.props.recommendationsToList(this.props.recommendList);
    }
    this.props.currentRegion === undefined ? this.props.getCurrentLocation() : this.state.currentRegion = this.props.currentRegion;
    this.props.personData.length != 0 && this.props.recommendList instanceof Array ? this.onRecommendations() : {};
    this.props.personData.length == 0 && !(this.props.recommendList instanceof Array) && prevProps.personData !== this.props.personData ? this.onRecommendations() : {};
    if(this.props.personData.length != 0 && prevProps.personData !== this.props.personData){
      this.onRecommendations()
    }
    prevProps.currentRegion !== this.props.currentRegion ? this.onRecommendations() : {};
    prevProps.userEventsinCalendar !== this.props.userEventsinCalendar ? this.onRecommendations() : {};
  }

}

const mapStateToProps = state => {
  //console.log(state)
  return {
    
    currentRegion: state.location.currentRegion,
    recommendList: state.recommend.recommendList,
    viewableList: state.recommend.viewableList,
    personData: state.bucket.personData,
    search: state.search.search,
    searchList: state.search.searchList,
    calendarAccessPermission: state.calendar.calendarAccessPermission,

    userEventsinCalendar: state.calendar.calendarEvents,
    //userBusy: state.calendar.userBusy
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation()),
    getRecommendations: query => dispatch(getRecommendations(query)),
    recommendationsToList: recommendations => dispatch(recommendationsToList(recommendations)),
    displayList: () => dispatch(displayList()),
    getSearchList: search => dispatch(getSearchList(search)),

    //getUserAvailability: (userEventsObject) => dispatch(getUserAvailability(userEventsObject))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
