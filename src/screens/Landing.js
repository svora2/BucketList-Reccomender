import styles from "../StyleSheet";
import React from 'react';
import {  Container, View, Button, TouchableOpacity, Text, Image } from "react-native";
import { clearErrors } from "../actions/authActions";
import { connect } from "react-redux";

class Landing extends React.Component{
constructor(){
  super();
}

render() {
  this.props.clearErrors();
    return (
      <View style={styles.landingContainer}>

        <View style={{justifyContent:"center", alignItems:"center", flex: 1}}>
            <Image 
            style={{width: 425, height: 290, marginTop: 25}} 
            source={require("../../assets/logo.png")} 
            />
        </View>

        <Text style = {{color: "#253446",  fontSize: 36, fontWeight: '500'}}>
          Welcome
        </Text>

        <Text style = {{color: "#253446", marginBottom: 70, marginRight: 40, textAlign: 'center', 
                      marginLeft: 40, marginTop: 10, fontSize: 16, fontWeight: '300'}}>
          Become one step closer to acheiving your BucketList goals
        </Text>


        <TouchableOpacity 
          accessible={true}
          testID="loginBtnLanding"
          accessibilityLabel="loginBtnLanding"
          style={styles.loginLandingButton} onPress={() => {this.props.navigation.navigate('Login')}}>
          <Text style={{color:"white", fontSize: 20, fontWeight:"bold", }}>

              Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          accessible={true}
          testID="signUpBtnLanding"
          accessibilityLabel="signUpBtnLanding"
          style={styles.signupLandingButton} onPress={() => {this.props.navigation.navigate('Signup')}}>
          <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
              Signup
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(null, mapDispatchToProps)(Landing);

