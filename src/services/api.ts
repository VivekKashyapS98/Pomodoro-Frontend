import axios from "axios";

export function setTokenHeader(token: any) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method: string, path: string, data: any) {
  return new Promise((resolve, reject) => {
    if (method === "get") {
      axios
        .get(path, data)
        .then((res: { data: unknown }) => resolve(res.data))
        .catch((err: { response: { data: { error: any } } }) =>
          reject(err.response.data.error)
        );
    } else if (method === "post") {
      axios
        .post(path, data)
        .then((res: { data: unknown }) => resolve(res.data))
        .catch((err: { response: { data: { error: any } } }) =>
          reject(err.response.data.error)
        );
    }
  });
}
