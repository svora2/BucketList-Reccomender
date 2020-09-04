import { getRecommendations, recommendationsToList } from "../actions/recommendAction";
import { Row } from "react-native-easy-grid";
import React from "react";
import { Text } from "react-native";

const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
  
    return next(action)
}

const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn()
    }
    const next = jest.fn()
  
    const invoke = action => thunk(store)(next)(action)
  
    return { store, next, invoke }
}

const initialState = {
    currentRegion: {
      latitude: 42.882004,
      longitude: 74.582748,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    bucketList: [],
    recommendList: [],
    viewableList: [],
    personData: [],
    search: '',
    searchList: [],
};

test('Recommend Action Test: getRecommendations Called With Empty List', () => {
    const { store, invoke } = create()

    invoke(getRecommendations(initialState))

    expect(store.dispatch).toHaveBeenCalledWith({"recommendList": {"results": []}, "type": "GET_RECOMMENDATIONS"})
});

test('Recommend Action Test: getRecommendations Called With Single Item List', async () => {
    const { store, invoke } = create()

    let modifiedState = {
        ...initialState,
        personData: [
                        {
                            "eachItem":  [
                                "-M4qhUFKuKJbtALxd_SS",
                                {
                                    "isCompleted": false,
                                    "item": "rockclimbing",
                                },
                            ],
                        },
                    ]
    }

    await invoke(getRecommendations(modifiedState))

    expect(store.dispatch).toHaveBeenCalled()
});

test('Recommend Action Test: getRecommendations Called With Multiple Item List', async () => {
    const { store, invoke } = create()

    let modifiedState = {
        ...initialState,
        personData: [
                        {
                            "eachItem":  [
                                "-M4qhUFKuKJbtALxd_SS",
                                {
                                    "isCompleted": false,
                                    "item": "rockclimbing",
                                },
                            ],
                        },
                    ]
    }

    await invoke(getRecommendations(modifiedState))

    expect(store.dispatch).toHaveBeenCalled()
});

test('Recommend Action Test: recommendationsToList Called With Empty List', () => {
    const { store, invoke } = create()

    invoke(recommendationsToList([]))

    expect(store.dispatch).toHaveBeenCalledWith({"type": "RECOMMENDATIONS_TO_LIST", "viewableList": <Row><Text>No Recommendations</Text></Row>})
});

test('Recommend Action Test: recommendationsToList', () => {
    const { store, invoke } = create()

    let recommendList = {
        results:  [
            {
                "name": "gym",
            },
        ],
    }

    invoke(recommendationsToList(recommendList))

    expect(store.dispatch).toHaveBeenCalled()
});