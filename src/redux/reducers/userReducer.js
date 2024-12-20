const initialState = {
  user: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;