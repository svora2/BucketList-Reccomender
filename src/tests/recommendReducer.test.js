import recommendReducer from '../reducers/recommendReducer'

const initialState = {
    currentRegion: { latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    bucketList: [],
    recommendList: [],
    viewableList: []
}

test('Recommend Reducer Test: GET_RECOMMENDATIONS Action Did Not Modify Initial State', () => {
    let action = {
        type: "GET_RECOMMENDATIONS",
        recommendList: ["Item"]
    }
    
    let modifiedState = {
                            ...initialState,
                            recommendList: ["Item"]
                        }

    expect(recommendReducer(undefined, action)).toStrictEqual(modifiedState);
});

test('Recommend Reducer Test: RECOMMENDATIONS_TO_LIST Action Did Not Modify Initial State', () => {
    let action = {
        type: "RECOMMENDATIONS_TO_LIST",
        viewableList: ["Item"]
    }

    let modifiedState = {
        ...initialState,
        viewableList: ["Item"]
    }

    expect(recommendReducer(undefined, action)).toStrictEqual(modifiedState);
});

test('Recommend Reducer Test: RECOMMENDATIONS_ERROR Action Did Not Modify Initial State', () => {
    let action = {
        type: "RECOMMENDATIONS_ERROR",
        err: ["Error"]
    }

    let modifiedState = {
        ...initialState,
        err: ["Error"]
    }

    expect(recommendReducer(undefined, action)).toStrictEqual(modifiedState);
});

test('Recommend Reducer Test: UNKNOWN Action Did Not Return Initial State', () => {
    let action = {
        type: "UNKNOWN"
    }

    expect(recommendReducer(undefined, action)).toStrictEqual(initialState);
});