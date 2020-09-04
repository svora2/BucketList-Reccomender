const initialState = {
    currentRegion: {
        latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421
    },
    error: '',
}

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_LOCATION":
            console.log("get current Location");
            return {
                ...state,
                currentRegion: action.currentRegion
            }
        case "GET_CUSTOM_LOCATION":
            console.log("Custom Location Reducer");
            return {
                ...state,
                currentRegion: action.currentRegion
            }
        case "GET_CUSTOM_LOCATION_ERROR":
            console.log("Custom Location Error Reducer")
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export default locationReducer;