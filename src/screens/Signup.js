import styles from "../StyleSheet";
import React from "react";
import {
  Container,
  View,
  Button,
  TextInput,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";

import { signup } from "../actions/authActions";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      signupPressed: false
    };
  }

  signupHandler = () => {
    this.props.signup(this.state);
    this.state.signupPressed = true;
    // console.log("auth error in signup" + this.props.authError);
    // console.log("value of isLogged in Signup: " + this.props.isLogged);
    // if (this.props.isLogged){
    //   this.props.navigation.navigate("SetupBucketList");
    // }

  }

  checkTextInput = () => {
    if (this.state.firstName != "") {
      if (this.state.lastName != "") {
        if (this.state.age != "0") {
          if (this.state.age < 13) {
            Alert.alert("User must be 13 yrs or older")
          }
          else if (this.state.age > 120) {
            Alert.alert("Please enter a valid age")
          }
          else {
            this.signupHandler();
          }
        } else {
          alert("Please enter your age.");
        }
      } else {
        alert("Please enter your last name.");
      }
    } else {
      alert("Please enter your first name.");
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <View style={styles.signupContainer}>
          <ScrollView>

            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Image
                style={{ width: 125, height: 130, marginTop: 45 }}
                source={require("../../assets/signuplogo.png")}
              />
            </View>

            <Text style={{ color: "#253446",  fontSize: 36, fontWeight: '500', textAlign: 'center', marginBottom: 25 }}>
              Create Account
        </Text>


          <TextInput
              accessible={true}
              testID="firstName"
              accessibilityLabel="firstName"
            style={styles.signupTextBox}
            onChangeText={text => {
              this.setState({ firstName: text });
            }}
            placeholder="First Name"
            value={this.state.firstName}
          ></TextInput>
          <TextInput
            accessible={true}
            testID="lastName"
            accessibilityLabel="lastName"
            style={styles.signupTextBox}
            onChangeText={text => {
              this.setState({ lastName: text });
            }}
            placeholder="Last Name"
            value={this.state.lastName}
          ></TextInput>
          <TextInput
            accessible={true}
            testID="age"
            accessibilityLabel="age"
            style={styles.signupTextBox}
            keyboardType="number-pad"
            onChangeText={text => {
              this.setState({ age: text });
            }}
            placeholder="Age"
            value={this.state.age}
          ></TextInput>
          <TextInput
          accessible={true}
          testID="emailSignUp"
          accessibilityLabel="emailSignUp"
          placeholder='Email'
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false} 
            style={styles.signupTextBox}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            placeholder="Email"
            value={this.state.username}
          ></TextInput>

          <TextInput
            accessible={true}
            testID="passwordSignUp"
            accessibilityLabel="passwordSignUp"
            secureTextEntry={true}
            placeholder='Password'
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false} 
            style={styles.signupTextBox}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            placeholder="Password"
            value={this.state.password}
          ></TextInput>

          {/* this currently displays the login error if there is one */}
           <Text style = {{color: "#dc3d31", width: 260, alignSelf: 'center', marginTop: 10}}>{this.props.authError}</Text> 

        <TouchableOpacity 
            accessible={true}
            testID="signUpBtn"
            accessibilityLabel="signUpBtn"
          style={styles.signupButton} onPress= {() => {this.checkTextInput();}}>
                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                    Sign Me Up!

                </Text>
            </TouchableOpacity>

            <Text style={{
              color: "#253446", marginRight: 40, textAlign: 'center',
              marginLeft: 40, marginTop: 10,  fontSize: 16, fontWeight: '300'
            }}>
              Already have an account?
        </Text>


        <TouchableOpacity 
          accessible={true}
          testID="loginBtnSignUp"
          accessibilityLabel="loginBtnSignUp"
          style={styles.loginTwoButton} onPress={() => {this.props.navigation.navigate('Login')}}>
            <Text style={{color:"white", fontSize: 20, fontWeight:"bold" }}>
                Login
            </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.state.signupPressed && prevProps.isLogged !== this.props.isLogged) {
      this.props.navigation.navigate("SetupBucketList");
      this.state.signupPressed = false;
    }
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.signupError,
    isLogged: state.auth.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: newUser => dispatch(signup(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
