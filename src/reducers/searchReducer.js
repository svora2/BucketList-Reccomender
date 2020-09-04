const initialState = {
    search: '',
    searchList: [],
    searchBucketList: [],
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SEARCH_LIST":
            return {
                ...state,
                search: action.search,
                searchList: action.searchList
            };
        case "GET_SEARCH_BUCKET_LIST":
            console.log("RE", action.search)
            return {
                ...state,
                search: action.search,
                searchBucketList: action.searchBucketList
            };
        default:
            return state;
    }
};

export default searchReducer;