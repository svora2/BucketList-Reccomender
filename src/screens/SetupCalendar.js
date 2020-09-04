import styles from "../StyleSheet";
import React from 'react';
import { Container, View, Button, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as Google from 'expo-google-app-auth';
import { getCalendar } from '../actions/calendarAction';

class SetupCalendar extends React.Component {

    constructor(props) {
        super(props);
    }

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: "219326236419-q8f0actqkosqk7j4k88n96lotr4idgif.apps.googleusercontent.com",
                androidClientId: "219326236419-4oc4g99scf05bagfaai3m0kq87uonhqa.apps.googleusercontent.com",
                scopes: ["profile", "email", "https://www.googleapis.com/auth/calendar.readonly"]
            })

            if (result.type === "success") {
                let x = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${result.user.email}/events`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + result.accessToken
                    }),
                });
                let json = await x.json();
               // console.log(json);
            } else {
                console.log("cancelled")
            }

        } catch (e) {
            console.log("error", e)
        }
    }

    test = () => {
        console.log(this.props);
    }

    render() {
        return (
            <View style={styles.landingcontainer}>
                <ScrollView>
                <Text 
                    accessible={true}
                    testID="syncMyCalendar"
                    accessibilityLabel="syncMyCalendar"
                    style = {{color: "#253446",  fontSize: 36, fontWeight: '500', textAlign: 'center', 
                marginTop: 75}}>
                    Sync My Calendar
                </Text>

                <Text 
                    accessible={true}
                    testID="addToSchedule"
                    accessibilityLabel="addToSchedule"
                     style = {{color: "#253446", marginBottom: 30, marginRight: 40, textAlign: 'center', 
                                marginLeft: 40, marginTop: 10,  fontSize: 16, fontWeight: '300'}}>
                    Add in your schedule to plan BucketList activities
                </Text>


                      <Button
                 title =  'sign-in'
                  onPress = {() => this.props.getCalendar()}
            accessible ={true}
            testID = 'signinCalendar'
            accessibilityLabel = 'signinCalendar'
          >
          </Button>          
          
                <TouchableOpacity 
                    accessible={true}
                    testID="skipBtnSetUpCalendar"
                    accessibilityLabel="skipBtnSetUpCalendar"
                    style={styles.skipButton} onPress= {() => {this.props.navigation.navigate('SetupLocation')}}>
                    <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                        Skip for now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    accessible={true}
                    testID="nextBtnSetUpCalendar"
                    accessibilityLabel="nextBtnSetUpCalendar"
                    style={styles.calendarNextButton} onPress= {() => {this.props.navigation.navigate('SetupLocation')}}>
                    <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                        Next

                    </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calendarEvents !== this.props.calendarEvents) {
           // console.log(this.props.calendarEvents);
        }
    }

}

const mapStateToProps = state => {
    return {
        calendarEvents: state.calendar.calendarEvents,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCalendar: () => dispatch(getCalendar()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupCalendar);
