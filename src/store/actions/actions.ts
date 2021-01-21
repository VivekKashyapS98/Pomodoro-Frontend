import { RUN_TASK, SET_TASKS, SET_USER } from "../actionTypes";
import { setTokenHeader } from "../../services/api";
import { apiCall } from "../../services/api";

export const setAuthorizationToken = (token: string) => {
  setTokenHeader(token);
};

export function setUserAuth(type: string, userData: any) {
  return function (
    dispatch: (arg0: { type: string; payload: { user: any } }) => void
  ): Promise<any> {
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
}

export const fetchTasks = (id: string) => (
  dispatch: (arg0: { type: string; payload: { tasks: unknown } }) => void
) => {
  return new Promise((resolve, reject) => {
    apiCall("get", `/api/tasks/${id}`, null)
      .then((data) => {
        console.log(data);
        dispatch({
          type: SET_TASKS,
          payload: {
            tasks: data,
          },
        });
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

export const createTask = (id: string, userData: any) => {
  return new Promise((resolve, reject) => {
    apiCall("post", `/api/tasks/${id}`, userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const removeTask = (id: string, task_id: string) => {
  return new Promise((resolve, reject) => {
    apiCall("delete", `/api/tasks/${id}/${task_id}`, null)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const addNotes = (id: any, task_id: any, notes: any) => {
  return new Promise((resolve, reject) => {
    apiCall("post", `/api/tasks/${id}/notes/${task_id}`, notes)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const setComplete = (id: any, task_id: any, userData: any) => {
  return new Promise((resolve, reject) => {
    apiCall("post", `/api/tasks/${id}/complete/${task_id}`, userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const setTask = (task: any) => (dispatch: any) => {
  dispatch({
    type: RUN_TASK,
    payload: {
      task,
    },
  });
};
