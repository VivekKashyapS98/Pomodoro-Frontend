import { SET_USER } from "../actionTypes";
import { setTokenHeader } from "../../services/api";
import { apiCall } from "../../services/api";

export const setAuthorizationToken = (token: string) => {
  setTokenHeader(token);
};

export const setUserAuth = (type: string, userData: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    apiCall("post", `/api/auth/${type}`, userData)
      .then(({ token, ...user }: any) => {
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(localStorage.jwtToken);
        dispatch({
          type: SET_USER,
          payload: {
            user,
          },
        });
        resolve(user);
      })
      .catch((err: any) => reject(err));
  });
};
