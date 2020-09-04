import { getSearchList, getSearchBucketList } from "../actions/searchAction";

const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
  
    return next(action)
}

const create = () => {
    const store = {
      getState: () => {
          return {
              recommend: {
                  recommendList: {
                        results:  [
                            {
                                "name": "gym",
                            },
                        ],
                    },
              },
              bucket: {
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
              },
          }
      },
      dispatch: jest.fn()
    }
    const next = jest.fn()
  
    const invoke = action => thunk(store)(next)(action)
  
    return { store, next, invoke }
}



test('Search Action Test: getSearchList Called With Empty String', () => {
    const { store, invoke } = create()

    invoke(getSearchList(""))

    expect(store.dispatch).toHaveBeenCalled()
});

test('Search Action Test: getSearchList With Matching String', () => {
    const { store, invoke } = create()

    invoke(getSearchList("gym"))

    expect(store.dispatch).toHaveBeenCalled()
});

test('Search Action Test: getSearchBucketList Called With Empty String', () => {
    const { store, invoke } = create()

    invoke(getSearchBucketList(""))

    expect(store.dispatch).toHaveBeenCalled()
});

test('Search Action Test: getSearchBucketList With Matching String', () => {
    const { store, invoke } = create()

    invoke(getSearchBucketList("rock"))

    expect(store.dispatch).toHaveBeenCalled()
});