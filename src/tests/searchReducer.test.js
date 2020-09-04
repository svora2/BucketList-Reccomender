import searchReducer from '../reducers/searchReducer'

const initialState = {
    search: '',
    searchList: [],
    searchBucketList: [],
}

test('Search Reducer Test: GET_SEARCH_LIST Action Did Not Modify Initial State', () => {
    let action = {
        type: "GET_SEARCH_LIST",
        search: "Search",
        searchList: ["Item"]
    }
    
    let modifiedState = {
                            ...initialState,
                            search: "Search",
                            searchList: ["Item"]
                        }

    expect(searchReducer(undefined, action)).toStrictEqual(modifiedState);
});

test('Search Reducer Test: GET_SEARCH_BUCKET_LIST Action Did Not Modify Initial State', () => {
    let action = {
        type: "GET_SEARCH_BUCKET_LIST",
        search: "Search",
        searchBucketList: ["Item"]
    }

    let modifiedState = {
        ...initialState,
        search: "Search",
        searchBucketList: ["Item"]
    }

    expect(searchReducer(undefined, action)).toStrictEqual(modifiedState);
});

test('Search Reducer Test: UNKNOWN Action Did Not Return Initial State', () => {
    let action = {
        type: "UNKNOWN"
    }

    expect(searchReducer(undefined, action)).toStrictEqual(initialState);
});