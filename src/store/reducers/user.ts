import { SET_USER } from "../actionTypes";

const userAuth = {
  isAuthenticated: false,
  user: {},
};

const user = (
  state = userAuth,
  action: { type: String; payload: { user: {} } }
) => {
  switch (action.type) {
    case SET_USER:
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default user;
