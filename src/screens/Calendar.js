import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { getCalendar } from '../actions/calendarAction';


// class Calendar extends React.Component {

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.calendarEvents
    };
  }

  render() {

    console.log("calendarEvents: " + JSON.stringify(this.props.calendarEvents));
    return (
      <View>
      <ScrollView>
        <Agenda

          //testing tags
          accessible = {true}
          testID = "agendaCalendar"
          accessibilityLabel = "agendaCalendar"
          
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items = {this.state.items}
          // Initially selected day
          selected = {(new Date()).getDate}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate = {(new Date()).getDate}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange = {1}
          // Specify how each item should be rendered in agenda
          renderItem = {this.renderItem.bind(this)}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate = {this.renderEmptyDate.bind(this)}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => { return (<View />); }}
          // Specify your item comparison function for increased performance
          rowHasChanged = {this.rowHasChanged.bind(this)}

          /*theme={{
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}*/
          // Agenda container style
          style={{}}
        />
      </ScrollView>
      <View
        style = {styles.view}
      >
      <Button
          title =  'Sync Calendar'
          onPress = {() => this.props.getCalendar()}
          accessible ={true}
          testID = 'syncCalendar'
          accessibilityLabel = 'syncCalendar'
      >
      </Button>
      </View>
      </View>
    );
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{"starts at:" + item.startTime }</Text>
        <Text>{"ends at:" + item.endTime }</Text>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    //console.log("date is " + date.toISOString());
    return date.toISOString().split('T')[0];
  }

  componentDidUpdate(prevProps) {
    if(prevProps.calendarEvents !== this.props.calendarEvents){
      this.setState({items: this.props.calendarEvents});
    }
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  view: {
    alignSelf: 'center',
    marginTop: '50%',
  }
});

const mapStateToProps = state => {
   //console.log(state);
  return {
    calendarEvents: state.calendar.calendarEvents,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCalendar: () => dispatch(getCalendar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
