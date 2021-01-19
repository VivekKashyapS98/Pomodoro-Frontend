import { stat } from "fs";
import { SET_USER } from "../actionTypes";

const userAuth = {
  isAuthenticated: false,
  user: {},
};

export default (state = userAuth, action) => {
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
