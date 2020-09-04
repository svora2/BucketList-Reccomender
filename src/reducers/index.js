import React from 'react';
import { combineReducers } from 'redux'
import { firebaseReducer} from 'react-redux-firebase';
import authReducer from './authReducer'
import bucketReducer from './bucketReducer';
import locationReducer from './locationReducer';
import recommendReducer from './recommendReducer';
import wishlistReducer from './wishlistReducer';
import myMemoriesReducer from './myMemoriesReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer, // stores whether or not user is logged in
    auth: authReducer,
    bucket: bucketReducer,          // stores the bucket lists
    location: locationReducer,       //stores the current location
    recommend: recommendReducer,     // stores recommendations based on user location
    wishlist: wishlistReducer,      //stores wishlist items
    memories: myMemoriesReducer,  //stores memory items
    profile: profileReducer,         // stores the user profile information
    search: searchReducer,      // stores search results
    calendar: calendarReducer,      // stores user's calendar
})

export default rootReducer;