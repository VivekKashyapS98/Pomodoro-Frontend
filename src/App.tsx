import React from "react";
import "./App.css";
import configureStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthorizationToken } from "./store/actions/actions";
import Routes from "./components/routes";
import { REMOVE_USER, SET_USER } from "./store/actionTypes";
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch({
      type: SET_USER,
      payload: {
        user: jwtDecode(localStorage.jwtToken),
      },
    });
  } catch (err) {
    store.dispatch({ type: REMOVE_USER, payload: { user: {} } });
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
