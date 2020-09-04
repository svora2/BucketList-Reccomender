const initialState = {
  memories: [],
  viewableMemories: []
};

const myMemoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MEMORIES":
      return {
        ...state,
        memories: action.memories
      };
    case "MEMORIES_TO_LIST":
      console.log("Putting Memories Into Viewable List");
      return {
        ...state,
        viewableMemories: action.viewableMemories
      };
    case "MEMORIES_ERROR":
      console.log("Memories Failed");
      return {
        ...state,
        err: action.err
      };
    case "MEMORIES_DELETE_SUCCESS":
      //do I remvoe it from the viewable wishlist
      return {
        ...state
      };
    case "MEMORIES_DELETE_ERROR":
      return {
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};

export default myMemoriesReducer;
