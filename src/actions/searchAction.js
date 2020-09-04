import {
    GET_SEARCH_LIST,
    GET_SEARCH_BUCKET_LIST
  } from "./types";
  
export const getSearchList = search => {
    return (dispatch, getState) => {
        var searchList = {
            bucketItem: [],
            results: []
          }
        var recommendList = getState().recommend.recommendList;
        if (search.length != 0  && recommendList !== undefined && recommendList.length != 0){
            var nameList = getState().recommend.recommendList.results.map((item) => {
                return (item.name);
            })
            var substringLength = search.length;
            var test = []
            for(var i = 0; i < nameList.length; i++) {
                if (nameList[i].substring(0,substringLength).toLowerCase() == search.toLowerCase()) {
                    test = test.concat(nameList[i])
                    searchList.results = searchList.results.concat(getState().recommend.recommendList.results[i])
                    //console.log("bucket item in recommend list: " + JSON.stringify(recommendList.bucketItem[i]))
                   searchList.bucketItem = searchList.bucketItem.concat(recommendList.bucketItem[i])
                }
            }
        }
        dispatch({ type: GET_SEARCH_LIST, search, searchList})
    }
}

export const getSearchBucketList = search => {
    return (dispatch, getState) => {
        var searchBucketList = []
        var bucketList = getState().bucket.personData;
        if (search.length != 0  && bucketList !== undefined && bucketList.length != 0){
            var nameList = bucketList.map((item) => {
                return (item.eachItem[1].item);
            })
            var substringLength = search.length;
            for(var i = 0; i < nameList.length; i++) {
                if (nameList[i].substring(0,substringLength).toLowerCase() == search.toLowerCase()) {
                    searchBucketList = searchBucketList.concat(bucketList[i])
                }
            }
        }
        else {
            searchBucketList = bucketList
        }
        console.log(search)
        dispatch({ type: GET_SEARCH_BUCKET_LIST, search, searchBucketList})
    }
}