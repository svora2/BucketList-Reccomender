import styles from "../StyleSheet";
import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";

import { login } from "../actions/authActions";


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginPressed: false
    };
  }

// Marked for Deletion
  // loginHandler = () => {
  //   this.props.login(this.state);
  //    if (this.props.isLogged) {
  //     this.props.navigation.navigate("Home");
  //   } else {
  //     console.log("ERROR: User not logged in correctly ");
  //   }
  // };

  onLogin = () => {
    this.props.login(this.state);
    this.state.loginPressed = true;
  }

// Marked for Deletion
  // checkTextInput = () =>{
  //   if (this.state.email != ""){
  //     if (this.state.password != ""){
  //         this.loginHander();
  //     }else{
  //       alert("Please enter your password.");
  //     }
  //   }else{
  //     alert("Please enter your email.");
  //   }
  // }
  
  render() {
    return (
      <View style={styles.loginContainer}>
        <ScrollView>
        <View style={{justifyContent:"center", alignItems:"center", flex: 1}}>
            <Image 
            style={{width: 425, height: 260, marginTop: 25}} 
            source={require("../../assets/loginLogo.png")} 
            />
        </View>

        <Text style = {{color: "#253446", fontSize: 36, fontWeight: '500', textAlign: 'center'}}>
          LOGIN
        </Text>

        <Text style = {{color: "#253446", marginBottom: 30, marginRight: 40, textAlign: 'center', 
                      marginLeft: 40, marginTop: 10, fontSize: 16, fontWeight: '300'}}>
          Please login to continue to the app
        </Text>

        <TextInput
          style={styles.loginTextBox}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          placeholder="Email"
          accessible={true}
          testID="loginEmail"
          accessibilityLabel="loginEmail"
          value={this.state.username}
        ></TextInput>

        <TextInput
          style={styles.loginTextBox}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          placeholder="Password"
          accessible={true}
          testID="loginPassword"
          accessibilityLabel="loginPassword"
          secureTextEntry
          value={this.state.password}
        ></TextInput>

        <Text style = {{color: "#dc3d31", width: 275, alignSelf: 'center', marginTop: 10}}>{this.props.authError}</Text>

        <TouchableOpacity 
          accessible={true}
          testID="loginBtnLogin"
          accessibilityLabel="loginBtnLogin"
          style={styles.loginButton} onPress= {() => this.onLogin()}>
                <Text style={{color:"#ffffff", fontSize: 20, fontWeight:"bold"}}>
                    Login
                </Text>
        </TouchableOpacity>

        <Text style = {{color: "#253446", marginBottom: 10, marginRight: 40, textAlign: 'center',
                      marginLeft: 40, marginTop: 10,  fontSize: 16, fontWeight: '300'}}>
          Don't have an account? 
        </Text>

        <TouchableOpacity 
          accessible={true}
          testID="signUpBtnLogin"
          accessibilityLabel="signUpBtnLogin"
          style={styles.loginSignupButton} onPress={() => {this.props.navigation.navigate('Signup')}}>
          <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
              Signup
          </Text>
        </TouchableOpacity>
        
        </ScrollView>
      </View>
    );
  }

  componentDidUpdate(prevProps){
    if (this.state.loginPressed && prevProps.isLogged !== this.props.isLogged){
      this.props.navigation.navigate("Home");
      this.state.loginPressed = false;
    }
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.loginError,
    isLogged: state.auth.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
