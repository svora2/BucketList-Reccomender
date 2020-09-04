import {
  GET_CALENDAR_ON_SUCCESS,
  GET_CALENDAR_ERROR,
  GET_USER_AVAILABILITY
} from "./types";
import * as Google from 'expo-google-app-auth'
import EachItem from "../components/EachItem";

export const getCalendar = () => {
  console.log("in here")
  return async (dispatch, getState) => {
    let eventsArray = [];
    var eventsObject = {};
    try {
      const googleAuth = await Google.logInAsync({
        iosClientId: "219326236419-q8f0actqkosqk7j4k88n96lotr4idgif.apps.googleusercontent.com",
        androidClientId: "219326236419-4oc4g99scf05bagfaai3m0kq87uonhqa.apps.googleusercontent.com",
        androidStandaloneAppClientId: "219326236419-mrfui19gvnted1302fai9r4slpn4o77o.apps.googleusercontent.com",
        scopes: ["profile", "email", "https://www.googleapis.com/auth/calendar.readonly"]
      })

      if (googleAuth.type === "success") {
        let events = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${googleAuth.user.email}/events`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer ' + googleAuth.accessToken
          }),
        });
        let eventsJson = await events.json();
        if (eventsJson.items !== undefined && eventsJson.items.length !== 0) {

          for (const event of Object.entries(eventsJson.items)) {

            //start date and time of event 
            let startDateTime = event[1].start.dateTime;
            //console.log("startDateTime: " + startDateTime);
            
            const eventStartDate = startDateTime.split('T')[0];
            //console.log("eventStartDate: " + eventStartDate);
            const startTime = startDateTime.split('T')[1];

            //end date and time of event
            let endDateTime = event[1].end.dateTime;
            const eventEndDate = endDateTime.split('T')[0];
            const eventEndTime = endDateTime.split('T')[1];

            //today's date and time
            var dateToday = (new Date()).toISOString().split('T')[0];
            var timeToday = (new Date()).toISOString().split('T')[1];
            //console.log("date today: " + dateToday + " time today: " + timeToday)
            if (dateToday <= eventStartDate) {
              //console.log(startDate + ": past")
              const eachEvent = {

                'eventID': event[1].id,
                'startDate': eventStartDate,
                'startTime': startTime,
                'endDate': eventEndDate,
                'endTime': eventEndTime,
                'source': event[1].source,
                'summary': event[1].summary
              };
              // console.log("eachItem:" + JSON.stringify(eachEvent))
              eventsArray.push(eachEvent);
            }
          }

          for (var i = 0; i < eventsArray.length; i++) {
            var startDate = eventsArray[i].startDate;
            var summary = eventsArray[i].summary;
            if (summary != undefined) {
              var currItem = {
                'startTime': eventsArray[i].startTime.split('-')[0],
                'endTime': eventsArray[i].endTime.split('-')[0],
                'name': eventsArray[i].summary
              };

              //conditional check for multiple events on the same day
              if(eventsObject[startDate]){
                eventsObject[startDate].push(currItem);
              }
              else{
                eventsObject[startDate] = [currItem];
              }
            }
          }
          
        };
   
      } 
      
      else 
      {
        //dispatch
        
      dispatch({ type: GET_CALENDAR_ERROR });
      }
      //console.log("calendar events in calendar action: " + JSON.stringify(eventsObject))
      dispatch({ type: GET_CALENDAR_ON_SUCCESS, eventsObject });  
    }
    catch (e) {
      console.log("error", e)
    }
  };
};

 /* export const getUserAvailability = (userEventsObject) => {
  return (dispatch) => {
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
          console.log("dateToday: " + dateToday +  " currTime: " + timeNow + "time after 2 hrs: " + timeAfter2hrs)

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

          console.log("isBusy in calendarAction: " + isBusy)
          dispatch({type: GET_USER_AVAILABILITY, isBusy})

  }

} 

export const getDatefromString = (dateTime) => {
  console.log("in function")
  return dateTime.split('T')[0];
}

export const getTimefromString = (dateTime) => {
  return dateTime.split('T')[1];
}*/
