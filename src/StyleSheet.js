import { StyleSheet, Dimensions } from 'react-native';

// NOTE: COMMENT what every style created is for
// also make MEANINGFUL NAMES

const styles = StyleSheet.create({
  //app container
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapContainer: {
    flex: 1,
    backgroundColor: '#f6f2f1',
    alignItems: 'center',
    justifyContent: 'center',
},

  landingContainer: {
    flex: 1,
    backgroundColor: '#f6f2f1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginContainer: {
    flex: 1,
    backgroundColor: '#a3cdd4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupContainer: {
    flex: 1,
    backgroundColor: '#9a9fd0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Input text boxes on signup screen
  signupTextBox:{
    width: 330,
    height: 70, 
    borderBottomColor: "gray", 
    borderBottomWidth: 2, 
    alignSelf: 'center',
    fontSize: 16,
  },

  //Input text boxes on login screen
  loginTextBox:{
    width: 330,
    height: 70,
    borderBottomColor: "gray", 
    borderBottomWidth: 2, 
    alignSelf: 'center',
    fontSize: 16 
  },

  //Button for logging the user in
  loginButton: {
    width:"65%",
    backgroundColor:"#253446",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 45,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  loginSignupButton: {
    width:"65%",
    backgroundColor:"#9a9fd0",
    justifyContent:"center",
    alignItems:"center",
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button for signing the user up
  signupButton: {
    width:"65%",
    backgroundColor:"#253446",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button on the landing page for login navigation
  loginLandingButton: {
    width:"65%",
    backgroundColor:"#a3cdd4",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 15,
    height: 50,
    borderRadius: 40,
    marginLeft: "0%",
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button on the landing page for signup navigation
  signupLandingButton: {
    width:"65%",
    backgroundColor:"#9a9fd0",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 15,
    height: 50,
    borderRadius: 40,
    marginLeft: "0%",
    marginBottom: 125,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button on the landing page for login navigation
  loginTwoButton: {
    width:"65%",
    backgroundColor:"#a3cdd4",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 15,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button on the home page for profile navigation
  profileButton: {
    width:"20%",
    backgroundColor:"#66aa33",
    alignItems:"center",
    height: 35,
    borderRadius: 20,
    marginRight: "5%",
    marginTop: "5%",
    alignSelf: 'flex-end'
  },

  //Button for logging the user out
  logoutButton: {
    width:"65%",
    backgroundColor:"#253446",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 50,
    borderRadius: 40,
    marginLeft: "0%",
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button for deleting the user's account
  deleteAccountButton: {
    width:"65%",
    backgroundColor:"#dc3d31",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 50,
    borderRadius: 40,
    marginLeft: "0%",
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  //Button for confirming deleting the user's account
  deleteConfirmButton: {
    width:"65%",
    backgroundColor:"#dc3d31",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

    //Button for cancelling the action
    cancelButton: {
    width:"65%",
    backgroundColor:"#a3cdd4",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    },
    
  //Button for skipping in sign up pages
  skipButton: {
    width:"60%",
    backgroundColor:"#253446",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 45,
    borderRadius: 40,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignSelf: 'center',
    marginTop: 100
  },

    //Button for skipping in sign up pages
    locationSkipButton: {
      width:"60%",
      backgroundColor:"#253446",
      justifyContent:"center",
      alignItems:"center",
      marginVertical: 35,
      height: 45,
      borderRadius: 40,
      elevation: 3,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      alignSelf: 'center',
      marginTop: 50
    },
      
  //Button for next page in sign up pages
  nextButton: {
    width:"60%",
    backgroundColor:"#f6598c",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 45,
    borderRadius: 40,
    marginTop: 325,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignSelf: 'center',
  }, 

  calendarNextButton: {
    width:"60%",
    backgroundColor:"#f6598c",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 35,
    height: 45,
    borderRadius: 40,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignSelf: 'center',
  }, 

  locationNextButton: {
    width:"60%",
    backgroundColor:"#f6598c",
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 15,
    height: 45,
    borderRadius: 40,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignSelf: 'center',
  }, 

  //Items within Lists
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: 10,
  },

  //Object that displays a list
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    paddingTop: 50,
    backgroundColor: '#f6f2f1',

  },
  wishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    paddingTop: 50,
    backgroundColor: '#f6f2f1',

  },

  //Button on the home page for location selection
  locationButton: {
    // flex: 1,
    // width:"85%",
    // backgroundColor:"#9a9fd0",
    // alignItems:"center",
    // alignContent:"center",
    // height: "5%",
    // borderRadius: 20,
    // paddingTop: '5%',
    // alignSelf: "center"

    width:"75%",
    backgroundColor:"#f6598c",
    justifyContent:"center",
    alignItems:"center",
    marginTop: "2%",
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginLeft: 15
    
  },
  refreshButton : {
    width:"95%",
    backgroundColor:"#253446",
    justifyContent:"center",
    alignItems:"center",
    // marginVertical: 35,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 5,
    alignSelf: 'center',
    fontWeight: "500",
    color: "#4f4b4c"
  },

  setupBucketListTextInput: {
    width: 250,
    height: 50,
    borderRadius: 40,
    borderStyle: 'solid',
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 15,
    fontSize: 16
  },

  setupBucketListItem: {
    padding: 10,
    borderStyle: 'solid',
    marginBottom: 10,
    width: 320,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: "#a3cdd4",
    fontSize: 18,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 10,
  },

  mapStyle: {
    width: Dimensions.get('window').width * .9,
    height: Dimensions.get('window').height * 0.5,
  },  

});

export default styles; 
