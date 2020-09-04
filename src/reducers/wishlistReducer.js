

const initialState = {
  wishlist: [],
  viewableWishList: []
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WISHLIST":
      // console.log("in reducer");
      // console.log(action.wishlist);
      return {
        ...state,
        wishlist: action.wishlist
      };
    case "WISHLIST_TO_LIST":
      console.log("Putting Wishlist Into Viewable List");
      return {
        ...state,
        viewableWishList: action.viewableWishList
      };
    case "WISHLIST_ERROR":
      console.log("Wishlist Failed");
      return {
        ...state,
        err: action.err
      };
    case "WISHLIST_DELETE_SUCCESS":
      //do I remvoe it from the viewable wishlist
      return {
        ...state
      };
    case "WISHLIST_DELETE_ERROR":
      return {
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};

export default wishlistReducer;
