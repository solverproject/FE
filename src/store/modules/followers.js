// action items
const ADD_FOLLOWERS = "ADD_FOLLOWERS";
const REMOVE_FOLLOWERS = "REMOVE_FOLLOWERS";

export const addFollowers = (payload) => {
  return {
    type: ADD_FOLLOWERS,
    payload,
  };
};

export const removeFollowers = (payload) => {
  return {
    type: REMOVE_FOLLOWERS,
    payload,
  };
};

const initialState = [
  {
    isFollower: false,
  },
];

const followers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOLLOWERS:
      return [...state, action.payload];
    case REMOVE_FOLLOWERS:
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

// export
export default followers;
