import _ from 'lodash';
import React from 'react';
import thunk from 'redux-thunk';
import { YellowBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import BucketList from "./src/screens/BucketList";
import Calendar from "./src/screens/Calendar";
import Home from "./src/screens/Home";
import InAction from "./src/screens/InAction";
import Landing from "./src/screens/Landing";
import Login from "./src/screens/Login";
import Memories from "./src/screens/Memories";
import Profile from "./src/screens/Profile";
import SetupBucketList from "./src/screens/SetupBucketList";
import SetupCalendar from "./src/screens/SetupCalendar";
import SetupLocation from "./src/screens/SetupLocation";
import Signup from "./src/screens/Signup";
import DeleteAccount from "./src/screens/DeleteAccount";
import CustomLocation from "./src/screens/CustomLocation"

import { Provider } from 'react-redux';
import rootReducer from "./src/reducers"

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//create store
const store = createStore(rootReducer, applyMiddleware(thunk));

const Auth = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false
    }
  },
  SetupBucketList: {
    screen: SetupBucketList,
    navigationOptions: {
      headerShown: false 
    }
  },
  SetupCalendar: {
    screen: SetupCalendar,
    navigationOptions: {
      headerShown: false
    }
  },
  SetupLocation: {
    screen: SetupLocation,
    navigationOptions: {
      headerShown: false
    }
  },

  Landing: {
    screen: Landing,
    navigationOptions: {
        headerShown: false 
    }
  }
}, {initialRouteName:"Landing"})

const profileNav = createStackNavigator({
  Profile: Profile,
  Home: Home,
  DeleteAccount: DeleteAccount,
  CustomLocation: CustomLocation,
}, {initialRouteName:"Home"})

//create bottom tab navigation
const BottomTabNav = createBottomTabNavigator({
  Home: profileNav,
  "My BucketList": BucketList,
  "Wish List": InAction,
  Calendar: Calendar,
  "My Memories": Memories
})

const MainApp = createSwitchNavigator({
  //InitialScreens: InitialScreens,
  Auth: Auth,
  Main: BottomTabNav
},
{
  initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(MainApp);

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }

}

export default App;


