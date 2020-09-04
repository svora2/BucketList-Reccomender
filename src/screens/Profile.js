import styles from "../StyleSheet";
import React from "react";
import {
  Container,
  View,
  Button,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { logout } from "../actions/authActions";
import { getUserInformation, saveProfile } from "../actions/profileActions";
import { useGestureHandlerRef } from "react-navigation-stack";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      logoutPressed: false

    };
  }

  componentDidMount() {
      this.props.getUserInformation();
      this.setState({ firstName: this.props.profile.fName });
      this.setState({ lastName: this.props.profile.lName });
      this.setState({ age: this.props.profile.age });
      this.setState({email : this.props.profile.email });
        if (this.state.firstName == null || this.state.firstName == undefined || this.state.firstName == ""){
          this.props.getUserInformation();
          this.setState({ firstName: this.props.profile.fName });
          this.setState({ lastName: this.props.profile.lName });
          this.setState({ age: this.props.profile.age });
          this.setState({email : this.props.profile.email });
        }

    this.forceUpdate()
  }

  logoutHandler = e => {
    this.props.logout();
    this.state.logoutPressed = true;
    // console.log("isLogged value in Profile for logout: " + this.props.isLogged);
    if (!this.props.isLogged) {
      this.props.navigation.navigate("Landing");
    } else {
      //user is still signed in
      console.log("ERROR: User is still signed in");
    }
  };

  saveProfile = e => {
    this.props.saveProfile(this.state);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          accessible={true}
          testID="editFNameProfile"
          accessibilityLabel="editFNameProfile"
          style={styles.signupTextBox}
          onChangeText={text => {
            this.setState({ firstName: text });
          }}
          placeholder={this.props.profile.fName}
          value={this.state.firstName}
        ></TextInput>
        <TextInput
          accessible={true}
          testID="editLNameProfile"
          accessibilityLabel="editLNameProfile"
          style={styles.signupTextBox}
          onChangeText={text => {
            this.setState({ lastName: text });
          }}
          placeholder={this.props.profile.lName}
          value={this.state.lastName}
        ></TextInput>

          {/* this is randomly throwing errors */}
        {/* <TextInput
          style={styles.signupTextBox}
          onChangeText={text => {
            this.setState({ age: text });
          }}
          placeholder={this.props.profile.age}
          value={this.state.age.toString()}
        ></TextInput> */}
        
{/* //            <TextInput
//           style={styles.signupTextBox}
//           placeholder={this.props.profile.age}
//           // value={this.state.age}
//         ></TextInput>  */}
        
        <TouchableOpacity
          accessible={true}
          testID="saveProfile"
          accessibilityLabel="saveProfile"
          style={styles.logoutButton}
          onPress={() => {
            this.saveProfile();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessible={true}
          testID="logoutBtnProfile"
          accessibilityLabel="logoutBtnProfile"
          style={styles.logoutButton}
          onPress={() => {
            this.logoutHandler();
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessible={true}
          testID="deleteAccountBtnProfile"
          accessibilityLabel="deleteAccountBtnProfile"
          style={styles.deleteAccountButton}
          onPress={() => {
            this.props.navigation.navigate("DeleteAccount");
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidUpdate(prevProps){
    if (this.state.logoutPressed && prevProps.isLogged !== this.props.isLogged){
      this.props.navigation.navigate("Landing");
      this.state.logoutPressed = false;
    }
  }

}


const mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getUserInformation: () => dispatch(getUserInformation()),
    saveProfile: (userInfo) => dispatch(saveProfile(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
