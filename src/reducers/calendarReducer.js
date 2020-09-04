const initialState = {
    calendarEvents: {},
    calendarAccessPermission: false,
    calendarPermissionError: "",
    userBusy: true
}

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_CALENDAR_ON_SUCCESS":
            return {
                ...state,
                calendarEvents: action.eventsObject,
                calendarAccessPermission: true,

            };
        case "GET_CALENDAR_ERROR":
            return{
                ...state,
                calendarPermissionError: "google authentication failed"
            };
        /* case "GET_USER_AVAILABILITY":
            return{
                ...state,
                userBusy: action.isBusy
            }     */

        default:
            return state;
    }
};

export default calendarReducer;