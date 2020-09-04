import {
  GET_USER_LOCATION,
  GET_CUSTOM_LOCATION,
  GET_CUSTOM_LOCATION_ERROR
} from "./types";

var initialRegion;

const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = 0.04;

export const getCurrentLocation = () => {
  return async (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition( async (position) => {
      var lat = await parseFloat(position.coords.latitude)
      var long = await parseFloat(position.coords.longitude)
      initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      dispatch({ type: GET_USER_LOCATION, currentRegion: initialRegion });
    },
        (error) => console.log("Location Error:", error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  };
};

export const getCustomLocation = (search) => {
  return async (dispatch) => {
    var currentRegion;

    const searchAPI = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${search}
    &inputtype=textquery&fields=place_id&key=AIzaSyBqh6uco7iZCh-FOBKWzPxxHAkTpBEtdFI`

    try {
      const searchResults = await fetch(searchAPI);
      const searchJSON = await searchResults.json();

      if (searchJSON.candidates.length == 0) {
        dispatch({type: GET_CUSTOM_LOCATION_ERROR, error: "Search API No Results"});
      }

      const detailsAPI = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${searchJSON.candidates[0].place_id}&fields=geometry&key=AIzaSyBqh6uco7iZCh-FOBKWzPxxHAkTpBEtdFI`

      const detailsResults = await fetch(detailsAPI);
      const detailsJSON = await detailsResults.json();

      if (detailsJSON.status !== "OK") {
        dispatch({type: GET_CUSTOM_LOCATION_ERROR, error: "Details API Error"});
      }

      var lat = detailsJSON.result.geometry.location.lat;
      var long = detailsJSON.result.geometry.location.lng;

      currentRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      dispatch({type: GET_CUSTOM_LOCATION, currentRegion})
    }
    catch(err){
      dispatch({type: GET_CUSTOM_LOCATION_ERROR, error: err});
    }
  }
};